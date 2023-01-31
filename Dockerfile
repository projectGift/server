FROM node:18
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install

# pm2 설치
RUN npm install -g pm2

COPY ./ ./
RUN npm run build
EXPOSE 3000
CMD [ "pm2-runtime", "start", "dist/main.js" ]