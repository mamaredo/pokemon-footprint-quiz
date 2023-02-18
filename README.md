# pokemon-footprint-quiz

## backend 環境構築

```sh
docker-compose up
```

```sh
cd backend
yarn
npx prisma migrate dev
yarn start:dev
```

server: `http://localhost:3000`  
API定義: `http://localhost:8080`