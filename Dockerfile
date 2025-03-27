FROM node:18-alpine as client-build

WORKDIR /app/client

COPY client/package*.json ./

RUN npm ci

COPY client ./

RUN npm run build:prod

FROM node:18-alpine as server-build

WORKDIR /app/server

COPY server/package*.json ./

RUN npm ci

COPY server ./

RUN npm prune --production

FROM node:18-alpine

WORKDIR /app

COPY --from=server-build /app/server ./server

ENV NODE_ENV=production
ENV PORT=5001

EXPOSE 5001

WORKDIR /app/server
CMD ["node", "server.js"] 