# Finance Portal Server with Docker

This repository contains a Flask server application that can be built and run using Docker. Follow the steps below to build and run the server.

## Pre-requisites

- Install [Docker](https://www.docker.com/products/docker-desktop) on your machine.

## Building the Docker Image

1. Open a terminal or command prompt, and navigate to the root directory of this project (the directory containing the `Dockerfile` and `app.py`).

2. Build the Docker image by running the following command:

    `docker build -t finance-server .`

This command will build a Docker image using the instructions in the `Dockerfile`.

## Running the Flask Server in a Docker Container

1. After building the Docker image, you can run a container using the following command:

    `docker run --name portal-server -p 5000:5000 finance-server`

This command maps port 5000 on your machine to port 5000 in the container.

2. Your Flask server should now be running inside a Docker container and accessible at `http://localhost:5000`. You can test the server by opening a browser and navigating to `http://localhost:5000`, or by using a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to make requests.

## Stopping the Flask Server

1. To stop the running Flask server container, run the following command:

    `docker stop portal-server`

2. (Optional) If you want to remove the stopped container, you can run:

    `docker rm portal-server`

Now you have successfully built, run, and stopped a Flask server using Docker.
