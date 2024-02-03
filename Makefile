up-db:
	docker compose -f stack.yml up mongo mongo-express -d
up-services:
	docker compose -f stack.yml up price-oracle worker --build
up: up-db up-services