dev:
	hugo server --buildDrafts --buildFuture

preview:
	hugo server --disableFastRender --environment production

new_post:
	@read -p "Post title (e.g. my-new-post): " name; \
	hugo new content/posts/$$name.md