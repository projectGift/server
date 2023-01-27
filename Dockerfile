FROM node:18
RUN mkdir -p /var/app
WORKDIR /var/app
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]