FROM node:16.15.1 AS client
WORKDIR /usr/src/frontend
COPY ./package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 8081