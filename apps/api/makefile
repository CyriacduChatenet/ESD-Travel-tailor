.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: install
install:
	npm install

.PHONY: reset
reset:
	docker volume rm $$(docker volume ls -q) && docker rmi $$(docker images -q)

.PHONY: resetf
resetf:
	docker stop $$(docker ps -a -q) \
	&& docker rm $$(docker ps -a -q) \
	&& docker rmi $$(docker images -q) \
	&& docker volume rm $$(docker volume ls -q) \
	&& docker system prune -a -f

.PHONY: dev
dev: 
	npm run start:dev

.PHONY: init
init: up install dev