# Etapa 1: Construcción
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Instalar dependencias
COPY package*.json ./
RUN yarn install --frozen-lockfile

# Copiar el resto del proyecto y construir
COPY . .
RUN yarn build

# Etapa 2: Imagen de producción
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN yarn install --production --frozen-lockfile

EXPOSE 3000

CMD ["node", "dist/main.js"]
