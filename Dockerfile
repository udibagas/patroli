FROM node:22

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV NODE_ENV=production

RUN npx sequelize db:create

RUN npx sequelize db:migrate

EXPOSE 3000

CMD [ "npm", "start" ]