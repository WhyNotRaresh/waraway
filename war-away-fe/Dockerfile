FROM node:16.14-alpine AS base

WORKDIR /app
COPY package*.json /app
EXPOSE 4200

FROM base AS dev
ENV NODE_ENV=development
RUN npm install -g @angular/cli@latest && npm link @angular/cli
RUN npm install
COPY . /app
