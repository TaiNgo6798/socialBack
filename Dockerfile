FROM node:10

WORKDIR /usr/src/app/socialweb/socialBack

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 6798

CMD ["npm", "run", "start:dev"]