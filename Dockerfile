FROM node:18 AS build
WORKDIR /app

COPY . .


RUN npm install

RUN npm install -g @angular/cli

# Compila a aplicação Angular
# RUN ng build --prod


CMD ["ng", "serve", "--host", "0.0.0.0"]
