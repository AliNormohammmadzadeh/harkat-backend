# Harkat Tashil API

NestJS REST backend for **پنل تسهیل** (Harkat Human Movement Foundation student dashboard).

## Documentation

- Product/data model: [`HARKAT-Dashboard-Data-Model-and-Routes (2).md`](../HARKAT-Dashboard-Data-Model-and-Routes%20(2).md)
- HTML prototype: [`DASHBO~3.HTM`](../DASHBO~3.HTM)
- Implementation checklist: [`TASK.md`](../TASK.md)

## Setup

```bash
# From repo root
docker compose up -d

cd backend
cp .env.example .env
npm install
npm run db:setup
npm run start:dev
```

API base: `http://localhost:3000/api`

**Swagger UI:** `http://localhost:3000/api/docs`  
**OpenAPI JSON:** `http://localhost:3000/api/docs-json`

Use **Authorize** with `Bearer <token>` after login.

## Demo users

| Username | Password   | Role        |
|----------|------------|-------------|
| admin    | admin1234  | super_admin |
| homa     | homa1234   | manager     |
| elahe    | elahe1234  | facilitator |
| mahsa    | mahsa1234  | supporter   |
| narges   | narges1234 | supporter   |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm run extract:students` | Extract REAL_STUDENTS from HTML → `prisma/seed-data.json` |
| `npm run prisma:migrate` | Run DB migrations |
| `npm run prisma:seed` | Seed users + 527 students |
| `npm run db:setup` | Full DB setup (extract + migrate + seed) |
