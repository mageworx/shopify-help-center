serve: 
	docker-compose exec app yarn start

build:
	docker-compose build app

start:
	docker-compose up -d

up: start serve