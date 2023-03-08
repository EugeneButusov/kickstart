FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system kickstart && \
          adduser --system -G kickstart kickstart

COPY dist/kickstart kickstart
RUN chown -R kickstart:kickstart .

CMD [ "node", "kickstart" ]
