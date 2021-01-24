FROM node:12.20.1-alpine3.12

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]