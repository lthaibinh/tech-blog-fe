# Stage 1: Base (Cài đặt dependencies)
FROM node:20-alpine AS BASE
WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --no-cache git && \
    yarn install --frozen-lockfile && \
    yarn cache clean

# Stage 2: Build (Biên dịch Next.js)
FROM node:20-alpine AS BUILD
WORKDIR /app
COPY --from=BASE /app/node_modules ./node_modules
COPY . . 
RUN apk add --no-cache git curl && \
    yarn build 

# Stage 3: Production (Chạy app)
FROM node:20-alpine AS PRODUCTION
WORKDIR /app

# Chỉ copy các file cần thiết để chạy app
COPY --from=BUILD /app/public ./public
COPY --from=BUILD /app/next.config.js ./
COPY --from=BUILD /app/.next/standalone ./
COPY --from=BUILD /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
