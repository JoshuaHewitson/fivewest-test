FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY ./dist .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]