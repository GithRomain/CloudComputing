FROM node:16.15.1 AS server
WORKDIR /usr/src/backend
COPY ./package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 5000