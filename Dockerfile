FROM node:20-alpine AS client-builder
WORKDIR /client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client ./
RUN npm run build
FROM node:20-alpine AS server-builder
WORKDIR /server
COPY server/package.json server/package-lock.json ./
RUN npm ci
COPY server ./
RUN npm run build
FROM alpine:latest
WORKDIR /app
RUN apk add --no-cache python3 py3-pip libwebp libwebp-dev build-base ca-certificates ffmpeg
RUN python3 -m venv /opt/venv
RUN /opt/venv/bin/pip install --no-cache-dir -U yt-dlp
ENV PATH="/opt/venv/bin:$PATH"
COPY --from=client-builder /client/dist /app/client/dist
COPY --from=server-builder /server /app/server
WORKDIR /app/server
EXPOSE 10000
CMD ["ts-node", "server.ts"]