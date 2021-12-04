FROM node:14.16.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3002

CMD ["npm", "start"]
