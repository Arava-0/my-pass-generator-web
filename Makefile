COMPOSE      = docker compose
COMPOSE_FILE = docker-compose.yml
DC           = $(COMPOSE) -f $(COMPOSE_FILE) --env-file .env

-include .env
export

PORT ?= 80

.DEFAULT_GOAL := help

up: ## Build + demarre le conteneur
	$(DC) up -d --build

down: ## Arrete le conteneur
	$(DC) down

restart: ## Rebuild + redemarre
	$(DC) down
	$(DC) up -d --build

logs: ## Logs en temps reel
	$(DC) logs -f

status: ## Etat du conteneur
	$(DC) ps

shell: ## Shell dans le conteneur
	$(DC) exec web sh

health: ## Verifie si le site repond
	@docker compose -f $(COMPOSE_FILE) exec web wget --spider -q http://localhost:80 2>/dev/null && echo "Web: OK" || echo "Web: DOWN"

setup: ## Genere le .env depuis l'exemple
	@test -f .env || (cp .env.example .env && echo "Created .env — modifie les valeurs puis: make up")
	@test -f .env && echo ".env existe deja"

nuke: ## DANGER — Supprime le conteneur + l'image locale
	@echo "Cela supprimera le conteneur et l'image locale de my-pass-generator-web !"
	@read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ] && $(DC) down --rmi local || echo "Aborted."

help: ## Affiche cette aide
	@awk 'BEGIN {FS = ":.*##"; printf "\nCommandes disponibles:\n"} /^[a-zA-Z_-]+:.*##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

.PHONY: up down restart logs status shell health setup nuke help
