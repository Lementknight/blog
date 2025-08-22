test_build:
	rm -rf public/
	hugo --environment production --minify --gc
	hugo server --disableFastRender --buildDrafts --buildFuture --environment production

live_build:
	rm -rf public/
	hugo --environment production --minify --gc
	hugo server --disableFastRender --environment production

new_post:
	@ARGS="$(filter-out $@,$(MAKECMDGOALS))"; \
	if [ -z "$$ARGS" ]; then \
		echo "Usage: make new_post word1 word2 word3"; \
		echo "Example: make new_post my awesome blog post"; \
		exit 1; \
	fi; \
	POST_NAME=$$(echo "$$ARGS" | tr ' ' '-' | tr '[:upper:]' '[:lower:]'); \
	hugo new content/posts/$$POST_NAME.md; \
	echo "Created: content/posts/$$POST_NAME.md"

# Prevent make from treating arguments as targets
%:
	@:
