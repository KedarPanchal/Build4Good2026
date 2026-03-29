.PHONY: all frontend backend down clean

all: frontend backend

frontend:
	open "./frontend/index.html"

backend:
	make -C backend

down:
	make -C backend down

clean:
	make -C backend clean
