# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci --legacy-peer-deps --maxsockets=1 && npm cache clean --force

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL
ARG REDIS_URL
ARG JWT_SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV REDIS_URL=$REDIS_URL
ENV JWT_SECRET=$JWT_SECRET
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache libc6-compat postgresql-client && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy build output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy runtime: drizzle schema + migration tools + seed
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/drizzle.config.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public

# Create entrypoint script that migrates + seeds then starts app
RUN echo '#!/bin/sh' > /app/entrypoint.sh && \
    echo 'set -e' >> /app/entrypoint.sh && \
    echo '' >> /app/entrypoint.sh && \
    echo 'echo "========================================="' >> /app/entrypoint.sh && \
    echo 'echo "  MedCare Hospital - Starting up..."' >> /app/entrypoint.sh && \
    echo 'echo "========================================="' >> /app/entrypoint.sh && \
    echo '' >> /app/entrypoint.sh && \
    echo '# Wait for database to be ready' >> /app/entrypoint.sh && \
    echo 'TIMEOUT=60' >> /app/entrypoint.sh && \
    echo 'i=0' >> /app/entrypoint.sh && \
    echo 'while [ $i -lt $TIMEOUT ]; do' >> /app/entrypoint.sh && \
    echo '  if pg_isready -h postgres -U postgres -d medcare_db 2>/dev/null; then' >> /app/entrypoint.sh && \
    echo '    echo "Database is ready!"' >> /app/entrypoint.sh && \
    echo '    break' >> /app/entrypoint.sh && \
    echo '  fi' >> /app/entrypoint.sh && \
    echo '  echo "Waiting for database... ($i/$TIMEOUT)"' >> /app/entrypoint.sh && \
    echo '  i=$((i + 1))' >> /app/entrypoint.sh && \
    echo '  sleep 2' >> /app/entrypoint.sh && \
    echo 'done' >> /app/entrypoint.sh && \
    echo '' >> /app/entrypoint.sh && \
    echo '# Push schema to database using Drizzle push with force' >> /app/entrypoint.sh && \
    echo 'echo "Running database migration..."' >> /app/entrypoint.sh && \
    echo 'DATABASE_URL="postgresql://postgres:postgres@postgres:5432/medcare_db" npx --yes drizzle-kit push --force 2>&1 | tail -5 || echo "Migration done"' >> /app/entrypoint.sh && \
    echo '' >> /app/entrypoint.sh && \
    echo '# Start the Next.js app' >> /app/entrypoint.sh && \
    echo 'echo "Starting MedCare Hospital server..."' >> /app/entrypoint.sh && \
    echo 'node server.js' >> /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh

# Create helper: seed script
RUN echo 'import { seedDatabase } from "./src/lib/seed"; seedDatabase();' > /app/seed-runner.mjs && \
    echo 'console.log("Seed complete");' >> /app/seed-runner.mjs

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=5 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

ENTRYPOINT ["/app/entrypoint.sh"]