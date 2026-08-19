#!/bin/sh
set -e

echo "[entrypoint] Waiting for PostgreSQL..."
until nc -z postgres 5432; do
  sleep 1
done
echo "[entrypoint] PostgreSQL is ready."

echo "[entrypoint] Running migrations..."
npx prisma migrate deploy

if [ "${RUN_SEED}" = "true" ]; then
  echo "[entrypoint] Seeding database..."
  if [ ! -f prisma/seed-data.json ]; then
    echo "[entrypoint] ERROR: prisma/seed-data.json missing. Run npm run extract:students before building."
    exit 1
  fi
  node dist/prisma/seed.js
  echo "[entrypoint] Seed complete. Set RUN_SEED=false on next restarts."
fi

mkdir -p "${UPLOAD_DIR:-/app/uploads}"

echo "[entrypoint] Starting API..."
exec "$@"
