FROM node:22

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV NODE_ENV=production

RUN cd frontend && npm install && npm run generate

CMD [ "npm", "start" ]