FROM node:18-alpine

WORKDIR /app
ARG API_BASE_URL 

COPY dvault-front/package*.json ./

ENV API_BASE_URL="${API_BASE_URL}"
RUN npm install

COPY . .

WORKDIR /app/dvault-front

RUN npm run build
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]

# ------
# Stage 1: Build the React application
# FROM node:18-alpine AS build

# WORKDIR /app

# COPY dvault-front/package*.json ./

# RUN npm install

# COPY dvault-front .

# RUN npm run build

# FROM caddy:alpine

# COPY Caddyfile /etc/caddy/Caddyfile

# COPY --from=build /app/build /usr/share/caddy

# RUN apk add --no-cache nodejs npm && npm install -g serve

# CMD ["serve", "-s", "/usr/share/caddy", "-l", "3000"]

# EXPOSE 80 3000
