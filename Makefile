dev:
	hugo server --buildDrafts --buildFuture

preview:
	hugo server --disableFastRender --environment production

new_post:
	`@printf` "Post title (e.g. my-new-post): "; \
	read name; \
	slug=$$(printf "%s" "$$name" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g'); \
	test -n "$$slug"; \
	hugo new "content/posts/$$slug.md"

debug:
	rm -rf public && hugo server --disableFastRender --noHTTPCache