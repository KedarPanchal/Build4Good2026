.PHONY: all run build open down clean n8n 

all: build run open

run:
	docker compose up -d

build:
	docker compose build --no-cache

open:
	sleep 5 && open http://localhost:5678

down:
	docker compose down

clean:
	yes | docker system prune

n8n:
	docker compose up -d n8n

