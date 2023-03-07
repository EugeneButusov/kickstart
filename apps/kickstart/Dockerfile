FROM node:18.14.2-alpine as builder

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.base.json ./
COPY nx.json ./
COPY libs ./libs
COPY apps/kickstart ./apps/kickstart

RUN apk add --no-cache git make g++ python3
RUN npm install -g pnpm
RUN pnpm install --prod

FROM node:18.14.2-alpine

COPY --from=builder /app /app
WORKDIR /app

CMD ["npx", "nx", "serve", "kickstart"]
