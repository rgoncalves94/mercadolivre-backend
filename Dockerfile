FROM node:10.18.0-alpine as build-stage
WORKDIR /usr/src/app
COPY package.json yarn.lock server.js ./
RUN yarn
COPY src src
ENTRYPOINT ["yarn", "start-prod"]