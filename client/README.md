# Finance Portal Client with Docker

This repository contains a React app built with Vite, which can be built and run using Docker. Follow the steps below to build and run the client-side app.

## Prerequisites

- Install [Docker](https://www.docker.com/products/docker-desktop) on your machine.

## Building the Docker Image

1. Open a terminal or command prompt, and navigate to the root directory of this project (the directory containing the `Dockerfile` and `package.json`).

2. Build the Docker image by running the following command:

    `docker build -t finance-client .`

This command will build a Docker image using the instructions in the `Dockerfile`.

## Running the React App in a Docker Container

1. After building the Docker image, you can run a container using the following command:

    `docker run --name portal-client -p 8080:80 finance-client`

This command maps port 8080 on your machine to port 80 in the container.

2. Your React app should now be running inside a Docker container and accessible at `http://localhost:8080`. Open a browser and navigate to `http://localhost:8080` to see your app.

## Stopping the React App

1. To stop the running React app container, run the following command:

    `docker stop portal-client`

2. (Optional) If you want to remove the stopped container, you can run:

    `docker rm portal-client`

Now you have successfully built, run, and stopped a React app using Docker.
