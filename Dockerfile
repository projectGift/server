FROM node:18
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install

# pm2 설치
RUN npm install -g pm2

COPY ./ ./
RUN npm run build
EXPOSE 3000

# github actions에서 끌어온 환경변수를 docker container 내에서 저장
RUN --mount=type=secret,id=PORT \
  --mount=type=secret,id=DB_URL \
  --mount=type=secret,id=DB_USERNAME \
  --mount=type=secret,id=DB_PASSWORD \
  --mount=type=secret,id=DB_HOST \
  --mount=type=secret,id=DB_NAME \
  --mount=type=secret,id=DB_PORT \
  --mount=type=secret,id=JWT_SECRET \
  --mount=type=secret,id=JWT_EXPIRESIN \
  export PORT=$(cat /run/secrets/PORT) && \
  export DB_URL=$(cat /run/secrets/DB_URL) && \
  export DB_USERNAME=$(cat /run/secrets/DB_USERNAME) && \
  export DB_PASSWORD=$(cat /run/secrets/DB_PASSWORD) && \
  export DB_HOST=$(cat /run/secrets/DB_HOST) && \
  export DB_NAME=$(cat /run/secrets/DB_NAME) && \
  export DB_PORT=$(cat /run/secrets/DB_PORT) && \
  export JWT_SECRET=$(cat /run/secrets/JWT_SECRET) && \
  export JWT_EXPIRESIN=$(cat /run/secrets/JWT_EXPIRESIN) && \
  printenv > .env

CMD [ "pm2-runtime", "start", "dist/main.js" ]