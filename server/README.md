# Finance Portal Server with Docker

This repository contains a server application built with Gin, a web framework written in Go, and GORM, an ORM library for Golang. The server can be built and run using Docker. Follow the steps below to build and run the server-side application.

## Prerequisites

- Install [Docker](https://www.docker.com/products/docker-desktop) on your machine.

## Building the Docker Image

1. Open a terminal or command prompt, and navigate to the root directory of this project (the directory containing the `Dockerfile` and `go.mod`).

2. Build the Docker image by running the following command:

    ```
    docker build -t finance-server .
    ```

This command will build a Docker image using the instructions in the `Dockerfile`.

## Running the Server in a Docker Container

1. After building the Docker image, you can run a container using the following command:

    ```
    docker run --name portal-server -p 5000:5000 finance-server
    ```

This command maps port 5000 on your machine to port 5000 in the container.

2. Your Gin server should now be running inside a Docker container and accessible at `http://localhost:5000`. Open a browser and navigate to `http://localhost:5000` to test the server endpoints.

## Stopping the Server

1. To stop running the Server container, run the following command:

    ```
    docker stop portal-server
    ```

2. (Optional) If you want to remove the stopped container, you can run:

    ```
    docker rm portal-server
    ```

Now you have successfully built, run, and stopped the Server using Docker.
