/**
 * CI pipeline for the blog.
 *
 * Every check and build runs in containers, so `dagger call <function>` behaves the
 * same on a laptop and in GitHub Actions. GitHub workflows only call these functions.
 */
import {
  dag,
  Container,
  Directory,
  argument,
  func,
  object,
} from "@dagger.io/dagger"

const HUGO_VERSION = "0.160.1"

// The theme is a git submodule, so it must be checked out in the source directory.
const IGNORE = [
  ".git",
  ".dagger",
  ".firebase",
  "public",
  "node_modules",
  "**/node_modules",
]

type Source = Directory

@object()
export class Blog {
  /** Debian with the extended Hugo release binary. */
  private hugoBase(): Container {
    return dag
      .container()
      .from("debian:bookworm-slim")
      .withExec([
        "sh",
        "-c",
        "apt-get update && apt-get install -y --no-install-recommends ca-certificates curl && rm -rf /var/lib/apt/lists/*",
      ])
      .withExec([
        "sh",
        "-c",
        `curl -fsSL https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-$(dpkg --print-architecture).tar.gz | tar -xz -C /usr/local/bin hugo && hugo version`,
      ])
  }

  /** Bun image with the repository's JS dev dependencies installed. */
  private bunBase(source: Source, base?: Container): Container {
    return (base ?? dag.container().from("oven/bun:1"))
      .withEnvVariable("PUPPETEER_SKIP_DOWNLOAD", "1")
      .withMountedCache("/root/.bun/install/cache", dag.cacheVolume("bun-install"))
      .withWorkdir("/src")
      .withFile("/src/package.json", source.file("package.json"))
      .withFile("/src/bun.lock", source.file("bun.lock"))
      .withExec(["bun", "install", "--frozen-lockfile"])
      .withDirectory("/src", source)
  }

  /** Run a Hugo build and return the generated site. */
  private hugoBuild(source: Source, args: string[]): Directory {
    return this.hugoBase()
      .withDirectory("/src", source)
      .withWorkdir("/src")
      .withMountedCache("/cache/hugo", dag.cacheVolume("hugo"))
      .withExec([
        "hugo",
        ...args,
        "--cacheDir",
        "/cache/hugo",
        "--destination",
        "/out",
      ])
      .directory("/out")
  }

  /** Production build (what gets deployed). Export with `dagger call build export --path=public`. */
  @func()
  build(
    @argument({ defaultPath: "/", ignore: IGNORE }) source: Source,
    baseUrl: string = "/",
  ): Directory {
    return this.hugoBuild(source, [
      "--gc",
      "--minify",
      "--environment",
      "production",
      "--baseURL",
      baseUrl,
    ])
  }

  /** Development build, including drafts and future-dated posts. */
  @func()
  buildDev(
    @argument({ defaultPath: "/", ignore: IGNORE }) source: Source,
  ): Directory {
    return this.hugoBuild(source, [
      "--buildDrafts",
      "--buildFuture",
      "--baseURL",
      "/",
    ])
  }

  /** Stylelint, markdownlint and the tag-name check (`bun run lint`). */
  @func()
  async lint(
    @argument({ defaultPath: "/", ignore: IGNORE }) source: Source,
  ): Promise<string> {
    return this.bunBase(source).withExec(["bun", "run", "lint"]).stdout()
  }

  /** codespell, configured by .codespellrc. */
  @func()
  async spell(
    @argument({ defaultPath: "/", ignore: IGNORE }) source: Source,
  ): Promise<string> {
    return dag
      .container()
      .from("python:3.13-slim")
      .withExec(["pip", "install", "--no-cache-dir", "codespell"])
      .withDirectory("/src", source)
      .withWorkdir("/src")
      .withExec(["codespell"])
      .stdout()
  }

  /** lychee link check of the Markdown content, configured by lychee.toml. */
  @func()
  async links(
    @argument({ defaultPath: "/", ignore: IGNORE }) source: Source,
  ): Promise<string> {
    return dag
      .container()
      .from("lycheeverse/lychee:latest")
      .withDirectory("/src", source)
      .withWorkdir("/src")
      .withExec([
        "lychee",
        "--config",
        "lychee.toml",
        "--no-progress",
        "content/**/*.md",
        "SECURITY.md",
      ])
      .stdout()
  }

  /**
   * Check the built site has its essential files, and that no published post is empty.
   * Builds the site itself unless a built `site` directory is passed in.
   */
  @func()
  async validate(
    @argument({ defaultPath: "/", ignore: IGNORE }) source: Source,
    site?: Directory,
  ): Promise<string> {
    const built = await (site ?? this.build(source)).entries()
    for (const required of ["index.html", "assets", "favicon.ico"]) {
      if (!built.includes(required) && !built.includes(`${required}/`)) {
        throw new Error(`${required} was not generated`)
      }
    }

    const posts = (await source.directory("content/posts").entries()).filter(
      (name) => name.endsWith(".md"),
    )
    const empty: string[] = []
    for (const name of posts) {
      const text = await source.file(`content/posts/${name}`).contents()
      if (/^draft:\s*true/m.test(text)) continue
      // Body is everything after the second front matter delimiter
      const body = text
        .split(/^---$/m)
        .slice(2)
        .join("---")
        .split("\n")
        .filter((line) => line.trim() !== "" && !/^\{\{.*\}\}$/.test(line))
      if (body.length === 0) empty.push(name)
    }
    if (empty.length > 0) {
      throw new Error(`Non-draft posts with no content: ${empty.join(", ")}`)
    }
    return `Site files present; ${posts.length} posts checked, none empty`
  }

  /** pa11y-ci against the built site in both themes (dark default, then light). */
  @func()
  async accessibility(
    @argument({ defaultPath: "/", ignore: IGNORE }) source: Source,
  ): Promise<string> {
    const withChromium = dag
      .container()
      .from("oven/bun:1")
      .withExec([
        "sh",
        "-c",
        "apt-get update && apt-get install -y --no-install-recommends chromium python3 && rm -rf /var/lib/apt/lists/*",
      ])
      .withEnvVariable("PUPPETEER_EXECUTABLE_PATH", "/usr/bin/chromium")

    return this.bunBase(source, withChromium)
      .withDirectory("/site", this.build(source))
      .withExec([
        "sh",
        "-c",
        "python3 -m http.server 8080 --directory /site >/dev/null 2>&1 & sleep 2 && bun run test:a11y",
      ])
      .stdout()
  }

  /** Run every check and both builds; reports all failures instead of stopping at the first. */
  @func()
  async ci(
    @argument({ defaultPath: "/", ignore: IGNORE }) source: Source,
    skipLinks: boolean = false,
  ): Promise<string> {
    const site = this.build(source)
    const checks: [string, Promise<unknown>][] = [
      ["lint", this.lint(source)],
      ["spell", this.spell(source)],
      ["build", site.sync()],
      ["build-dev", this.buildDev(source).sync()],
      ["validate", this.validate(source, site)],
      ["accessibility", this.accessibility(source)],
    ]
    if (!skipLinks) checks.push(["links", this.links(source)])

    const results = await Promise.allSettled(checks.map(([, run]) => run))
    const failed = results
      .map((result, i) => ({ name: checks[i][0], result }))
      .filter(({ result }) => result.status === "rejected")

    if (failed.length > 0) {
      const detail = failed
        .map(({ name, result }) => `${name}: ${(result as PromiseRejectedResult).reason}`)
        .join("\n\n")
      throw new Error(`${failed.length} check(s) failed:\n\n${detail}`)
    }
    return `All ${checks.length} checks passed: ${checks.map(([n]) => n).join(", ")}`
  }
}
