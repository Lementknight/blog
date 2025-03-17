---
title: "Hosting a Hugo blog on GitHub Pages with GitHub Actions"
tags: ["hugo", "github-pages", "github-actions"]
date: 2025-03-17T10:48:29+02:00
description: "Tutorial on how to publish a Hugo blog using GitHub Actions"
draft: true
---
This post describes how to set up a blog using [Hugo](https://gohugo.io/), an
open-source static site generator. The blog is hosted on [GitHub
Pages](https://pages.github.com/), a web hosting service offered by GitHub. The
[GitHub Actions](https://github.com/features/actions) continuous integration service is used to
deploy changes to the blog.

> This post is based on Claudio Jolowicz's article
> [Hosting a Hugo blog on GitHub Pages with Travis CI](https://cjolowicz.github.io/posts/hosting-a-hugo-blog-on-github-pages-with-travis-ci/).
> (The original tutorial was made before [GitHub Actions](https://github.com/features/actions) effectively replaced [Travis CI](https://www.travis-ci.com/))
