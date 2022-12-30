# Stage 1
FROM node:16-alpine as builder
RUN apk add --no-cache libc6-compat
WORKDIR /builder/usr/app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM node:16-alpine as deployer
WORKDIR /usr/app
COPY package*.json ./
COPY .env ./.env
RUN npm install --production
COPY --from=builder /builder/usr/app/dist ./dist
USER node
CMD ["npm","start"]
