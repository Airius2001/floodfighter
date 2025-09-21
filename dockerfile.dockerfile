# Stage 1 — install deps (keeps cacheable)
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2 — build
FROM node:18-alpine AS builder
WORKDIR /app
# copy installed deps from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# prune dev deps (make node_modules production-only)
RUN npm prune --production

# Stage 3 — runtime
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# copy only what is needed to run
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
# Assumes package.json has "start": "next start -p 3000"
CMD ["npm", "start"]
