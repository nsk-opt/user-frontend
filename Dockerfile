FROM node:18 AS build

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

FROM nginx:latest AS web-server

COPY --from=build /app/frontend /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./ssl /etc/ssl

CMD ["nginx", "-g", "daemon off;"]