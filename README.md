# Final Project : Shop alcool

Created: March 5, 2023 7:46 PM
Person: Romain Pasquier, Lounès Seguin
Tags: CSS, Dockerfile, HTML, bind, bridge, docker, docker-compose, javascript, mongoDB, mount, node.js, volumes, vue.js

# Introduction

In this project, we aim to create a web-based shop for alcohol using a combination of various technologies. Our team, consisting of Romain Pasquier and Lounès Seguin, will utilize CSS, Dockerfile, HTML, bind, bridge, docker, docker-compose, javascript, mongoDB, mount, node.js, volumes, and vue.js.

Our primary objective is to create a user-friendly and efficient online shop for alcohol that incorporates modern web development practices. To achieve this, we will be using CSS to style the web pages, HTML for the structure, and javascript for the functionality.

We will also be utilizing Dockerfile and docker-compose to containerize the application and simplify the deployment process. Additionally, we will be using mongoDB as our database backend to store and manage the data of our shop.

To ensure that our application is scalable and easily maintainable, we will be using node.js and vue.js to build the frontend interface. We will also be using bind and bridge to connect the frontend and backend of our application.

We will be using volumes and mounts to persist data across containers and to ensure that our application is highly available and fault-tolerant.

Overall, we are confident that our use of these technologies will enable us to create a robust and scalable online shop for alcohol that meets the needs of our users.

# How to run the app

### Architecture

```bash
TD3/
├── ...
├── Frontend/
│   ├── ...
│   ├── Dockerfile
├── Backend/
│   ├── ...
│   ├── Dockerfile
├── docker-compose.yml
```

### How to install docker :

Docker Compose is a tool for creating, deploying, and managing multi-container applications with Docker. It allows developers to define the components of their application, such as services, networks, and volumes, in a single configuration file. This makes it easier to create, deploy, and manage applications in a self-hosted environment. Additionally, Docker Compose can be used to build, ship, and run applications in a distributed environment, allowing applications to be scaled easily.

This command is used to install Docker on a computer. It downloads the Docker installation script and runs it. It also sets up the Docker daemon to run in rootless mode, which allows non-privileged users to access the Docker daemon.

```bash
ubuntu@nas:~$ curl -L "get.docker.com" | sh
```

The code below will install Docker on your computer. It uses the `curl` command to download the Docker installation script from the official website, and then runs it. The script will set up the Docker daemon to run in rootless mode, which means that non-privileged users will be able to access the Docker daemon. It will also install the latest version of Docker, so that you can have the most up-to-date version of the software.

```bash
ubuntu@nas:~$ sudo curl -L <https://github.com/docker/compose/releases/download/v2.15.1/docker-compose-linux-x86_64> -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose && docker-compose --version
```

### How to use docker and run the app

With Docker Compose, we are able to define a multi-container application in a single configuration file. In our case, the `docker-compose.yml` file defines the services that make up our application, including the frontend and backend containers.

When we run `docker-compose up`, Docker Compose will find each Dockerfile (in this case, in the `Frontend/` and `Backend/` directories), build the images, and then create and start the containers. The containers will be connected to the same network and can communicate with each other, allowing the frontend and backend to work together as a single application.

By using Docker Compose, we are able to easily manage the deployment and scaling of our application, and ensure that it is consistent across different environments.

### Dockerfiles

Here is the `dockerfile` (we are using node 16 on this project):

The Node.js image version is important because it determines which version of Node.js will be used to run the application. Different versions of Node.js may have different features, performance characteristics, and compatibility with different libraries and frameworks. Choosing the appropriate version of Node.js can help ensure that the application runs smoothly and efficiently.

In a Dockerfile, `FROM` specifies the base image from which the new image is built. `WORKDIR` sets the working directory for any subsequent instructions that follow in the Dockerfile. `COPY` copies files or directories from the host machine to the container. `RUN` executes a command in the container. `EXPOSE` specifies the port on which the container will listen for incoming connections.

Here are the Dockerfiles for the frontend and backend containers. The frontend Dockerfile is not included in the document, but it is located in the Frontend/ directory. The backend Dockerfile is shown below. It uses Node.js version 16.15.1 and exposes port 8081 for communication with the frontend container.

```docker
FROM node:16.15.1 AS client
WORKDIR /usr/src/frontend
COPY ./package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 8081
```

Here are the Dockerfiles for the frontend and backend containers. The backend Dockerfile is not included in the document, but it is located in the Backend/ directory. The backend Dockerfile is shown below. It uses Node.js version 16.15.1 and exposes port 5000 for communication with the frontend container.

```docker
FROM node:16.15.1 AS server
WORKDIR /usr/src/backend
COPY ./package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 5000
```

Now this is the `docker-compose.yml` file :

- `version`: The version of the Docker Compose file syntax to use.
- `services`: A list of services to run, along with their configuration options.
- `container_name`: The name to use when creating a new container from the image.
- `build`: Specifies the build context (directory containing the Dockerfile) and other build options.
- `command`: The command to run inside the container when it starts.
- `ports`: Specifies the ports to expose on the host machine and the container.
- `depends_on`: Specifies the services that a service depends on. Docker Compose will start these services before starting the dependent service.
- `restart`: Specifies the restart policy for the container.
- `image`: Specifies the name of the image to use for the service.

In Docker, a volume is a way to store and manage data generated by a container. Volumes are used to persist data across container restarts and to share data between containers. When a container is started, it can mount a volume as a directory on its file system, allowing it to read and write data to the volume. Volumes can be created and managed using the `docker volume` command or using the `volumes` key in a `docker-compose.yml` file.

In this project, the team is using volumes to ensure that their application is highly available and fault-tolerant. They are persisting data across containers to ensure that data is not lost when a container is restarted or terminated.

```docker
version: '3.8'

services:

#development
  # frontend:
  #   container_name: frontend
  #   build: ./Frontend
  #   command: npm start
  #   ports:
  #     - 8081:8081
  #   depends_on:
  #     - backend
  #   restart: unless-stopped

  # backend:
  #   container_name: backend
  #   build: ./Backend
  #   command: npm start
  #   ports:
  #     - 5000:5000
  #   depends_on:
  #     - mongodb
  #   restart: always

#production
  frontend:
    container_name: frontend
    image: dockerromix/cloud-project-frontend:latest
    command: npm start
    ports:
      - 8081:8081
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    container_name: backend
    image: dockerromix/cloud-project-backend:latest
    command: npm start
    ports:
      - 5000:5000
    depends_on:
      - mongodb
    restart: always

  mongodb:
    container_name: mongodb
    image: mongo:latest
    volumes:
      - ./db:/data/db
    restart: unless-stopped
```

This is a project proposal for creating a web-based shop for alcohol using a combination of various technologies. The team plans to utilize CSS, Dockerfile, HTML, bind, bridge, docker, docker-compose, javascript, mongoDB, mount, node.js, volumes, and vue.js. The objective of the project is to create a user-friendly and efficient online shop for alcohol that incorporates modern web development practices. To achieve this, the team will use CSS to style the web pages, HTML for the structure, and javascript for the functionality. They will also be utilizing Dockerfile and docker-compose to containerize the application and simplify the deployment process. Additionally, they will be using mongoDB as their database backend to store and manage the data of the shop. To ensure that the application is scalable and easily maintainable, they will be using node.js and vue.js to build the frontend interface. They will also be using bind and bridge to connect the frontend and backend of the application. The team will be using volumes and mounts to persist data across containers and to ensure that the application is highly available and fault-tolerant. The document also provides instructions on how to run the app, how to install Docker, and the Dockerfile and docker-compose files used in the project.

### Persistent database

In the `docker-compose.yml` file, the `mongodb` service is defined with a volume mount that maps the container's `/data/db` directory to the host's `./db` directory. This allows the data to be persisted on the host machine, even if the container is deleted or recreated. Therefore, the mongoDB database used in this project is persistent as long as the `./db` directory is not deleted from the host machine. This ensures that the data stored in the database is not lost and can be accessed even after the container is restarted or terminated.

### How conection between container are made

In the backend we’ve got an `/config/db.js` :

```jsx
// Export mongoose
const mongoose = require("mongoose");
//Assign MongoDB connection string to Uri and declare options settings
// Important!!! set your real login and passwd in connection string
const uri ="mongodb://mongodb:27017/shop";
// Declare a variable named option and assign optional settings
const options = {
useNewUrlParser: true,
useUnifiedTopology: true
};

mongoose.Promise = global.Promise;
// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(uri, options).then(() => {
console.log("Database connection established!");
console.log("Successfully connected to Atlas MongoDB.");
},
err => {
{
console.log("Error connecting Database instance due to:", err);
}
})
.catch(err=>{
console.log(err);
console.log('Could not connect to MongoDB.');
});
```

This document outlines the plan to create a web-based shop for alcohol using various technologies such as CSS, Dockerfile, HTML, bind, bridge, docker, docker-compose, javascript, mongoDB, mount, node.js, volumes, and vue.js. The project aims to create a user-friendly and efficient online shop by utilizing modern web development practices. The document provides instructions on running the application, installing Docker, and the Dockerfile and docker-compose files used in the project. The team will be using volumes and mounts to persist data across containers and to ensure that the application is highly available and fault-tolerant. The backend container connects to the frontend using bind and bridge. The mongoDB database used in the project is persistent as long as the `./db` directory is not deleted from the host machine. This ensures that the data stored in the database is not lost and can be accessed even after the container is restarted or terminated.

And in the frontend we’ve got an `/src/htpp-common.js`:

```jsx
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json"
  }
});
```

The selected text is a project proposal for creating a web-based shop for alcohol using a combination of various technologies. The project is aimed to create a user-friendly and efficient online shop by utilizing modern web development practices. The team will be using CSS to style the web pages, HTML for the structure, and javascript for the functionality. They will also be utilizing Dockerfile and docker-compose to containerize the application and simplify the deployment process. Additionally, they will be using mongoDB as their database backend to store and manage the data of the shop. To ensure that the application is scalable and easily maintainable, they will be using node.js and vue.js to build the frontend interface. They will also be using bind and bridge to connect the frontend and backend of the application. The team will be using volumes and mounts to persist data across containers and to ensure that the application is highly available and fault-tolerant. The document also provides instructions on how to run the app, how to install Docker, and the Dockerfile and docker-compose files used in the project.

### To run the app

We’ve make our image on docker-hub compatible with amd and arm os : 

[Docker](https://hub.docker.com/repositories/dockerromix)

```bash
docker-compose up -d
```