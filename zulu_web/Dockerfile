# Stage 1
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
#COPY .env ./
#RUN yarn install --frozen-lockfile
RUN npm install

# Stage 2
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
##COPY .env ./.env
COPY . .

#RUN yarn build
RUN npm run build
# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
#COPY .env ./.env
USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
