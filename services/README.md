# Services

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

## Running in local env

```bash
yarn install
yarn dev
```

## Running unit tests
```bash
yarn test
```

## Running docker
```bash
docker run --name <container-name> -e DB_URL=<dburl> -p 5000:5000 -d blueprint-health
```