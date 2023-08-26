FROM node:20.5.0-alpine3.18
WORKDIR /app
COPY ./ /app
RUN npm install && npm run build

FROM nginx:alpine-slim
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/conf.d/default.conf