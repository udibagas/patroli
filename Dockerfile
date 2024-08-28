FROM node:22

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx sequelize db:create --env production

RUN npx sequelize db:migrate --env production

EXPOSE 3000

CMD [ "npm", "start" ]