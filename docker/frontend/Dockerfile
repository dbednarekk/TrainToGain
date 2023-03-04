FROM node:14-alpine

RUN apk update && apk add bash
WORKDIR /app

COPY ../.. /app/
WORKDIR /app/ui
RUN npm install