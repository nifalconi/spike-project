# Lorem Ipsum
## Description

Programming challenge for Spike/Bain.

This project is made with [Nest](https://github.com/nestjs/nest).

## Endpoints

```javascript
GET '/calculate-addresses-distance'
// query: address1: string; address2: string.
// Example: distances/calculate-addresses-distance?address1=Tobalaba, Chile&address2=Baquedano, Chile

GET '/past-requests'
```
## Installation

```bash
$ npm install
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### TODO:
- Error Handling, if the one addresses doesn't exists then it will throw a 500 error instead of describing it.
- Input validation.
- Testing.