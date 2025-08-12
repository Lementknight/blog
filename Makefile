test_build:
	rm -rf public/
	hugo --environment production --minify --gc
	hugo server --disableFastRender --environment production --buildFuture 

live_build:
	rm -rf public/
	hugo --environment production --minify --gc
	hugo server --disableFastRender --environment production