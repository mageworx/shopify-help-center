serve:
	docker-compose exec app yarn start

build:
	docker-compose build app

start:
	docker-compose up -d

up: start serve

staging-build:
	TARGET=prod APP_ENV=staging URL_PREFIX=staging- docker-compose build

staging-push: staging-build
	AWS_PROFILE=mageworx TARGET=prod APP_ENV=staging URL_PREFIX=staging- docker-compose push

prod-build:
	TARGET=prod APP_ENV=prod URL_PREFIX= docker-compose build

prod-push: prod-build
	AWS_PROFILE=mageworx TARGET=prod APP_ENV=prod URL_PREFIX= docker-compose push