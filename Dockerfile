########################################
# Stage: build — install deps, build static assets with Vite
########################################
FROM node:20-alpine AS build

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
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
