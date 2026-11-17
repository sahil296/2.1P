# SIT725 Task 2.2P — Calculator API

A small Express calculator with a browser keypad and REST API for basic arithmetic.

## Prerequisites

Node.js 18 or newer.

## Setup and run

```sh
npm install
node index.js
```

The server listens on port 3000 by default. Set `PORT` to use another port.

## Endpoints

- `GET /add?a=2&b=3` — adds the two query values.
- `POST /calc` — JSON body: `{"operation":"add","a":2,"b":3}`. Operations: `add`, `subtract`, `multiply`, `divide`.
- `GET /calc/:operation/:a/:b` — calculates using values in the URL.

Examples:

```sh
curl "http://localhost:3000/add?a=2&b=3"
curl -X POST http://localhost:3000/calc -H "Content-Type: application/json" -d '{"operation":"multiply","a":4,"b":5}'
curl http://localhost:3000/calc/divide/10/2
```

## Project structure

- `index.js` — Express server and calculator API
- `public/index.html` — calculator page
- `package.json` — project metadata and start command
- `package-lock.json` — locked dependency versions
