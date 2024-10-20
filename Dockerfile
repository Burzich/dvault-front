FROM node:18-alpine AS build

WORKDIR /app

ARG API_BASE_URL
ENV API_BASE_URL="${API_BASE_URL}"

COPY dvault-front/package*.json ./
RUN npm install

COPY . .

WORKDIR /app/dvault-front
RUN npm run build

FROM caddy:alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dvault-front/build /usr/share/caddy

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
