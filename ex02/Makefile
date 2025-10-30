DC_FILE = docker-compose.yml
CONTAINERS_DIR = /home/$(USER)/data

all: up

up:
	echo "Container directory: $(CONTAINERS_DIR)"
	mkdir -p $(CONTAINERS_DIR)
	docker-compose -f $(DC_FILE) up --bulid -d

down:
	docker-compose -f $(DC_FILE) down

stop:
	docker-compose -f $(DC_FILE) stop

# nuclear reset button for docker
clean: down
	rm -rf $(CONTAINERS_DIR)
	docker rmi -f $$(docker images -qa)          # delete ALL images
	docker volume rm $$(docker volume ls -q)     # delete ALL volumes
	docker network rm $$(docker network ls -q)   # delete ALL networks
	clear
	echo "Cleaned"

re: clean all

.PHONY: all up down stop clean
