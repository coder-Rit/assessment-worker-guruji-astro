FROM node:20.14.0-alpine


WORKDIR /app
COPY . .

RUN npm install


CMD [ "npm", "start" ]