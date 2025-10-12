# Stage 1 — Build Next.js app
FROM node:18 AS builder
WORKDIR /app

# Install build tools for node-gyp
RUN apt-get update && apt-get install -y python3 make g++ openssl nginx \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 — Runtime with Nginx + Node
FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Install Nginx + OpenSSL for SSL
RUN apt-get update && apt-get install -y nginx openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy built app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Generate self-signed certificate for container’s IP at runtime
RUN mkdir -p /etc/nginx/certs && \
    openssl req -newkey rsa:2048 -nodes -keyout /etc/nginx/certs/ip.key \
    -x509 -days 365 -out /etc/nginx/certs/ip.crt \
    -subj "/CN=localhost"

# Configure Nginx
RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 443

# Start both Node app and Nginx
CMD service nginx start && npm start