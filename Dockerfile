# Etapa 1: build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Etapa 2: producción
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN yarn install --production --frozen-lockfile

EXPOSE 3000

CMD ["node", "dist/main.js"]
