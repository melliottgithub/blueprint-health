FROM node:lts-buster-slim

WORKDIR /app
COPY ./build/ .
COPY package.json .
COPY yarn.lock .

ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production

EXPOSE 6000

CMD ["node", "server.js"]