# Travel tailor

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/docs/)
[![Nest.js](https://img.shields.io/badge/Nest.js-E0234D?style=for-the-badge&logo=nestjs&logoColor=white)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336790?style=for-the-badge&logo=postgresql&logoColor=white)]()
[![swagger](https://img.shields.io/badge/Swagger-green?style=for-the-badge&logo=swagger&logoColor=white)](https://swagger.io/)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/docs/)
[![next](https://img.shields.io/badge/Next.js-20232A?style=for-the-badge&logo=nextdotjs&logoColor=FFFFFF)](https://nextjs.org/)
[![sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

[![docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![vercel](https://img.shields.io/badge/Vercel-323330?style=for-the-badge&logo=vercel&logoColor=FFF)](https://vercel.com/)
[![pnpm](https://img.shields.io/badge/PNPM-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/fr/)

<br/>

## Lib Schema
<img src="./assets/images/lib-schema.jpg" alt="Lib schema">

<br/>

## .env example
```bash
// API env var

API_PORT =
ADMINER_PORT =
CLIENT_APP_URL =
API_URL =
JWT_SECRET =
POSTGRESQL_DATABASE_TYPE =
POSTGRESQL_DATABASE_HOST =
POSTGRESQL_DATABASE_PORT =
POSTGRESQL_DATABASE_NAME =
POSTGRESQL_DATABASE_USERNAME =
POSTGRESQL_DATABASE_PASSWORD =
MAILDEV_PORT =
```

run project in parallel
```bash
pnpm -r --parallel run dev
```

run project
```bash
pnpm --filter api run dev || cd apps/api && npm run dev

pnpm --filter client run dev || cd apps/client && npm run dev
```

## Deployed environements

- [API](https://travel-tailor-api.vercel.app/api/v1)
- [Client](https://travel-tailor-client.vercel.app/)

## Class diagram
- [Class diagram](https://dbdiagram.io/d/637e1c76c9abfc611174bd92)