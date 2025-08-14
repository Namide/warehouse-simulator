# -e NPM_CONFIG_PREFIX=/home/node/.npm-global to fix global npm install
code:
	docker run -ti --rm \
		-v $(shell pwd)\:/usr/src/app \
		-w /usr/src/app \
		-u "node" \
		-e NPM_CONFIG_PREFIX=/home/node/.npm-global \
		node:20-slim \
		bash

install:
	docker run -ti --rm \
		-v $(shell pwd)\:/usr/src/app \
		-w /usr/src/app \
		-u "node" \
		-e NPM_CONFIG_PREFIX=/home/node/.npm-global \
		node:20-slim \
		npm install

dev:
	(sleep 4 && python3 -m webbrowser http://localhost:3000) &
	docker run -ti --rm \
		-v $(shell pwd)\:/usr/src/app \
		-w /usr/src/app \
		-p 3000\:3000 \
		-u "node" \
		-e NPM_CONFIG_PREFIX=/home/node/.npm-global \
		node:20-slim \
		npm run dev