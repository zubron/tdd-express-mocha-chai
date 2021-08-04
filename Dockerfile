FROM node:12.20.1-alpine3.12

RUN apk add --no-cache curl

RUN curl -L https://www.jslint.com/jslint.mjs > jslint.mjs

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]