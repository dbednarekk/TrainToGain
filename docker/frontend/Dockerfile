FROM node:20-alpine

RUN apk update && apk add bash
WORKDIR /app

COPY ../../ui .
RUN npm install