FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system kickstart
RUN adduser --system -G kickstart kickstart

COPY dist/apps/kickstart kickstart
RUN chown -R kickstart:kickstart .

CMD [ "node", "kickstart" ]
