FROM node:latest AS build

WORKDIR /app

COPY . /app

RUN npm install typescript

RUN npx tsc

FROM nginx:latest AS web-server

COPY --from=build /app/frontend /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html/src
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./ssl /etc/ssl

CMD ["nginx", "-g", "daemon off;"]