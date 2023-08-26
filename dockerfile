FROM node:18-alpine as builder

WORKDIR /root

COPY . .

RUN npm ci

RUN npm run build

FROM node:18-alpine

WORKDIR /root

COPY --from=builder /root/.output /root

EXPOSE 3000

CMD [ "node", "/root/server/index.mjs"]