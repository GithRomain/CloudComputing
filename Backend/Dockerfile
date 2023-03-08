#This line specifies the base image for the backend container, which is Node.js version 16.15.1.
FROM node:16.15.1 AS server
#This command sets the working directory for the backend container.
WORKDIR /usr/src/backend
#This command copies the package.json file from the host machine to the container.
COPY ./package*.json ./
#This command installs the dependencies specified in the package.json file.
RUN npm install
#This command copies all files from the host machine to the container.
COPY ./ ./
#This line specifies the port on which the container will listen for incoming connections.
EXPOSE 5000