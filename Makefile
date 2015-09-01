install:
	npm install && ./node_modules/.bin/bower install --config.interactive=false --allow-root

clean:
	rm -rf node_modules
	rm -rf bower_components
	rm -rf public/*

watch:
	./node_modules/.bin/grunt live --force

build:
	./node_modules/.bin/grunt deploy --force

deploy:
	./node_modules/.bin/grunt deploy --force
	cd public/; \
		git init .; \
		git checkout -b gh-pages; \
		git add .; \
		git remote add origin git@github.com:clindsey/reactNotes.git; \
		git commit -am 'deploying'; \
		git push origin gh-pages --force
