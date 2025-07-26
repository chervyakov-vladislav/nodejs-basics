FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json tsconfig*.json webpack.config.js ./
RUN npm ci
COPY src ./src
RUN npm run build

FROM node:22-alpine AS prod

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
