FROM node:12
EXPOSE 3000
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
CMD npm start
