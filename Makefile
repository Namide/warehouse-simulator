
install:
	cd back && $(MAKE) install
	cd front && $(MAKE) install

lint:
	cd back && $(MAKE) lint
	cd front && $(MAKE) lint

# -e NPM_CONFIG_PREFIX=/home/node/.npm-global to fix global npm install
code:
	docker run -ti --rm \
		-v $(shell pwd)\:/usr/src/app \
		-w /usr/src/app \
		-p 3000\:3000 \
		-u "node" \
		-e NPM_CONFIG_PREFIX=/home/node/.npm-global \
		node:20-slim \
		bash

types:
	docker run -ti --rm \
		-v $(shell pwd)/front\:/usr/src/app/front \
		-v $(shell pwd)/back\:/usr/src/app/back \
		-w /usr/src/app/back \
		-u "node" \
		-e NPM_CONFIG_PREFIX=/home/node/.npm-global \
		node:slim \
		npm run share

share:
	$(MAKE) types

soft:
	~/Applications/DbVisualizer/dbvis &
	python3 -m webbrowser http://localhost:8102 &
	python3 -m webbrowser http://localhost:8101 &
	python3 -m webbrowser http://localhost:8100

dev:
	docker-compose -f $(shell pwd)/docker/docker-compose.yaml up

build:
	docker run -ti --rm \
		-u "node" \
		-v $(shell pwd)/back\:/usr/src/app \
		-w /usr/src/app \
		node:slim \
		npm run build
	docker run -ti --rm \
		-u "node" \
		-v $(shell pwd)/front\:/usr/src/app/front \
		-v $(shell pwd)/back\:/usr/src/app/back \
		-w /usr/src/app/front \
		node:slim \
		npm run build

api:
	curl -X POST http://localhost:8101/users \
		-H 'Content-Type: application/json' \
		-d '{"nickname":"ChunLi","email":"chun-li@sf.com","password":"AWDwf123eawe#@!","role":"user"}'
	curl -X POST http://localhost:8101/users \
		-H 'Content-Type: application/json' \
		-d '{"nickname": "Lara","email": "lara@croft.com","password": "AWDwf123eawe#@!","role": "admin"}'

sql-drop:
	cd back && $(MAKE) sql-drop

# back-dev:
# 	(sleep 4 && python3 -m webbrowser http://localhost:8101) &
# 	docker run -ti --rm \
# 		-v $(shell pwd)/back\:/usr/src/app \
# 		-w /usr/src/app \
# 		-p 8101\:3000 \
# 		-u "node" \
# 		node:slim \
# 		npm run start:dev

# run:
# 	python3 -m webbrowser http://localhost:8100/
# 	docker-compose up

# back:
# 	docker run -ti --rm \
# 		-u "node" \
# 		-v $(shell pwd)/back\:/usr/src/app \
# 		-w /usr/src/app \
# 		node\:slim \
# 		bash

# front:
# 	docker run -ti --rm \
# 	-u "node" \
# 	-v $(shell pwd)/front\:/usr/src/app/front \
# 	-v $(shell pwd)/back\:/usr/src/app/back \
# 	-p 3000\:5000 \
# 	-w /usr/src/app/front \
# 	node\:slim \
# 	bash

# typecheck:
# 	docker run -ti --rm \
#     -u "node" \
#     -v $(shell pwd)/front:/usr/src/app/front \
#     -v $(shell pwd)/back:/usr/src/app/back \
#     -w /usr/src/app/front \
#     node:slim \
#     npm run typecheck

# lint:
# 	docker run -ti --rm \
#     -u "node" \
#     -v $(shell pwd)/front:/usr/src/app/front \
#     -v $(shell pwd)/back:/usr/src/app/back \
#     -w /usr/src/app/front \
#     node:slim \
#     npm run lint

# patch:
# 	docker run -ti --rm \
# 		-u "node" \
#     -v $(shell pwd)/back:/usr/src/app \
#     -w /usr/src/app \
#     node:slim \
#     npm version patch
# 	docker run -ti --rm \
#     -u "node" \
#     -v $(shell pwd)/front:/usr/src/app/front \
#     -v $(shell pwd)/back:/usr/src/app/back \
#     -w /usr/src/app/front \
#     node:slim \
#     npm version patch
# 	git commit -am "Patch"
# 	git push

# logs:
# 	docker-compose logs --tail=10 -f

# back-logs:
# 	docker logs diji-back  --tail=10 -f
