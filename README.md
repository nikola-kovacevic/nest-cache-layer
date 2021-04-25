# REDIS CACHE SERVICE

## Description

Redis cache service for [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
npm install
```

## Running the app

```bash
# start Redis if you don't have it running
$ sudo docker run --name redis-container -p 6379:6379 -d redis

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
- `http://localhost:3000/item/:id` where you can read immediate random values first generated then from cache
- `http://localhost:3000/slow-item/:id` on first call it takes 5 secs to get the value, after that it is read from cache without TTL
- `http://localhost:3000/slow-ttl-item/:id` on first call it takes 5 secs to get the value, after that it is read from cache with 10 sec TTL
