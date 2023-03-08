FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system kickstart
RUN adduser --system -G kickstart kickstart

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY dist/apps/kickstart .
RUN chown -R kickstart:kickstart .

RUN apk add --no-cache git make g++ python3
RUN npm install -g pnpm
RUN pnpm install --prod

CMD [ "node", "main" ]
