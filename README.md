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
API仕様書: `http://localhost:8080`