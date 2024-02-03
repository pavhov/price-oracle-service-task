FROM node:lts-alpine AS build

WORKDIR /build

ENV NODE_ENV=development

ADD package.json .
ADD package-lock.json .
ADD .eslintrc.js .eslintrc.js
ADD nest-cli.json nest-cli.json
ADD tsconfig.json tsconfig.json
ADD tsconfig.build.json tsconfig.build.json

RUN npm ci --legacy-peer-deps --strict-peer-deps
ADD . .

RUN npm run build price-oracle
RUN npm run build worker


FROM node:lts-alpine AS service

WORKDIR /build

ENV NODE_ENV=production

ADD package.json .
ADD package-lock.json .

RUN npm ci --legacy-peer-deps --strict-peer-deps

COPY --from=build /build/dist/apps /build/dist/apps
