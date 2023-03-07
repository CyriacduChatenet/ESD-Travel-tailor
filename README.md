# Travel tailor

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/docs/)
[![Nest.js](https://img.shields.io/badge/Nest.js-E0234D?style=for-the-badge&logo=nestjs&logoColor=white)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336790?style=for-the-badge&logo=postgresql&logoColor=white)]()
[![swagger](https://img.shields.io/badge/Swagger-green?style=for-the-badge&logo=swagger&logoColor=white)](https://swagger.io/)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/docs/)
[![next](https://img.shields.io/badge/Next.js-20232A?style=for-the-badge&logo=nextdotjs&logoColor=FFFFFF)](https://nextjs.org/)
[![sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://amzn.github.io/style-dictionary/#/)

[![docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![vercel](https://img.shields.io/badge/Vercel-323330?style=for-the-badge&logo=vercel&logoColor=FFF)](https://vercel.com/)
[![vite](https://img.shields.io/badge/Vite-B04EFD?style=for-the-badge&logo=vite&logoColor=FFFFFF)](https://vitejs.dev/)
[![pnpm](https://img.shields.io/badge/PNPM-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/fr/)
[![Prettier](https://img.shields.io/badge/Prettier-1B2B34?style=for-the-badge&logo=prettier&logoColor=white)](https://prettier.io/)
[![style-dictionary](https://img.shields.io/badge/Style_dictionary-3FC5C0?style=for-the-badge&logo=style_dictionary&logoColor=white)](https://amzn.github.io/style-dictionary/#/)

<br/>

### Project structure
<img src="./assets/images/lib-schema.jpg" alt="Lib schema">

<br/>

This project use multiple internal libs and apps. all are orgnaized in two folders at the PNPM workspace root (apps & packages).

```bash
- apps
| - api
| - client
- packages
| - constants
| - contexts
| - functions
| - hooks
| - services
| - styles
| - types
| - ui
```

<br/>

### .env example
- API env var
    ```bash
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
- Client env var
    ```bash
    NEXT_PUBLIC_API_URL =
    ```
<br/>

### API makefile
```bash
.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: install
install:
	npm install

.PHONY: reset
reset:
	docker volume rm $$(docker volume ls -q) && docker rmi $$(docker images -q)

.PHONY: resetf
resetf:
	docker stop $$(docker ps -a -q) \
	&& docker rm $$(docker ps -a -q) \
	&& docker rmi $$(docker images -q) \
	&& docker volume rm $$(docker volume ls -q) \
	&& docker system prune -a -f

.PHONY: dev
dev: 
	npm run start:dev

.PHONY: init
init: up install dev
```

<br/>

## Run project

install dependancies
```bash
pnpm i
```

run project in parallel
```bash
pnpm -r --parallel run dev
```

run project individualy

pnpm
```bash
pnpm --filter api run dev 
pnpm --filter client run dev 
```
npm
```bash
cd apps/api && npm run dev
cd apps/client && npm run dev
```
<br/>

## Build project
-  build client web app

    pnpm
    ```bash
    pnpm --filter client run build
    ```

    npm
    ```bash
    cd apps/client && npm run build
    ```
    <br/>

-  build api

    pnpm
    ```bash
    pnpm --filter api run build
    ```

    npm
    ```bash
    cd apps/api && npm run build
    ```

-  build UI lib

    pnpm
    ```bash
    pnpm --filter ui run build
    ```

    npm
    ```bash
    cd packages/ui && npm run build
    ```

    <br/>

## Deployed environements

- [API](https://travel-tailor-api.vercel.app/api/v1/doc)
- [Client](https://travel-tailor-client.vercel.app/)

<br/>

## Class diagram
- [Class diagram](https://dbdiagram.io/d/637e1c76c9abfc611174bd92)