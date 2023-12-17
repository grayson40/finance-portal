# Finance Portal

A portal to view and manage your personal finances.

## Getting Started

Follow these instructions to get started!

## Pre-requisites

<details>
	<summary>Node.js</summary>

Node.js is used to manage project dependencies. Download the latest version of Node.js [here.](https://nodejs.org/en/download/)
</details>

<details>
	<summary>Go</summary>

Go is used for the backend. Download the latest version of Go [here.](https://go.dev/dl/)
</details>

<details>
	<summary>Git</summary>

Git is used to manage the repository. Download the latest version of Git [here.](https://gitforwindows.org/)
</details>

<details>
	<summary>Docker</summary>

Docker is used to build and serve the client and server sides. Download the latest version of Docker [here.](https://www.docker.com/)
</details>

<details>
	<summary>VS Code</summary>

VS Code is used to build and test the app. Debugging and version control is very easy through this editor. Download the latest version of VS Code [here](https://code.visualstudio.com/download).
</details>

## Installation & Running

**Getting started with the Finance Portal...**

1. To Start, clone this repository from GitHub, change into the cloned directory, and checkout the master branch.
    ```
    git clone https://github.com/grayson40/finance-portal.git
    cd finance-portal
    git checkout master
    ```
    Working off the master branch will ensure that you're using the latest released version of Finance Portal.

2. Configure environment variables.

    1. Create a copy of the `.env.example` file and name it `.env`. This file will hold your environment variables.

        ```
        cd server
        cp .env.example .env
        ```

    2. Open the `.env` file in a text editor. You'll see a list of environment variables with placeholder values.

    3. Replace the placeholder values with your actual values. For example, 

        ```
        DB_CONNECTION_STRING="finance-portal.db"
        APP_PORT="5000"
        JWT_SECRET="super_secret_secret"
        ```
    4. Save the `.env` file and close the text editor. Your application will now use these environment variables when it runs.

3. Build and run the project.

    ```
    docker-compose up --build
    ```

    - The `docker-compose.yml` file defines two services: client and server. The client service builds and runs the React app, while the server service builds and runs the Golang server.
    - Both services are configured to expose their respective ports to the host machine (8080 for the client and 5000 for the server).

## Notes
Navigate to the respective [client](https://github.com/grayson40/financial-portal/blob/master/client/README.md) and [server](https://github.com/grayson40/financial-portal/blob/master/server/README.md) repositories for **individual** Docker instructions.