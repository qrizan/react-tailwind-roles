########################################
# Stage: build — install deps, build static assets with Vite
########################################
FROM node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite inlines env vars into the JS bundle at build time — must be a build
# ARG, not a runtime container env var. Default matches the current .env
# so `docker build` with no --build-arg still works during local dev.
ARG VITE_BASE_URL=http://localhost:8000
ENV VITE_BASE_URL=$VITE_BASE_URL

RUN npm run build

########################################
# Final stage: nginx — serve dist/, SPA fallback for react-router-dom
########################################
FROM nginx:alpine@sha256:db35bfc6b2951e7f8a72db5db120288c127ffaeeb4a6d4b95a26fead017d5913

COPY --from=build /app/dist /usr/share/nginx/html
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
