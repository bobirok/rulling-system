FROM node:20 AS build

WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-slim AS production

WORKDIR /
COPY --from=build /dist /dist
COPY package*.json ./
RUN npm install --production
RUN npm install sqlite3 --no-save

EXPOSE 3000
CMD ["node", "dist/src/server.js"]
