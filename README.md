# REDIS CACHE SERVICE

## Description

Redis cache service for [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Interacting with the app

App exposes two GET routes for interacting with the cache:

- `http://localhost:3000/clear-cache` where you can clear Redis cache
- `http://localhost:3000/item/` where you can read random values from cache
