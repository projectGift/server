FROM node:18
WORKDIR /usr/src/app

# 종속성 먼저 다운로드 받아서 소스코드 일부만 변경된 것으로 불필요하게 모듈을 다시 다운로드받지 않게 하기
COPY package.json ./
RUN npm install

# pm2 설치
RUN npm install -g pm2

COPY ./ ./
RUN npm run build

# 컨테이너의 3000번 포트 열기
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

# pm2를 docker 컨테이너에서 돌리기 위해서는 pm2-runtime으로 실행
CMD [ "pm2-runtime", "start", "dist/main.js" ]