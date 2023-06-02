# Services

This Typescript/Node project implement a REST API. It uses Express and Postgres. See *Project setup* section for additional details of libraries used.

## Project setup

```bash
yarn init -y
yarn add express cors dotenv
yarn add pg sequelize
yarn add -D @types/sequelize @types/pg
yarn add -D typescript ts-node-dev @types/express @types/cors @types/dotenv
yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint
yarn add -D jest ts-jest @types/jest
./node_modules/.bin/tsc --init
```

## Environment variables

Create a `.env` file in the root of the project with the following content:
```bash
DB_URL=postgres://<user>:<password>@<host>:<port>/<dbname>
```
```

## Running in local env

```bash
yarn install
yarn dev
```

## Running unit tests
```bash
yarn test
```

## Building docker image

Script provided to build a docker image with the name `blueprint-health`:

```bash
yarn docker-build
```

## Running docker
```bash
docker run --name <container-name> -e DB_URL=<dburl> -p 5000:5000 -d blueprint-health
```