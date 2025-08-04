
# 1. Build React app
FROM node:18 as client-builder
WORKDIR /app
COPY client ./client
WORKDIR /app/client
RUN npm install && npm run build

# 2. Build Node server
FROM node:18
WORKDIR /app
COPY server ./server
COPY --from=client-builder /app/client/build ./server/public
WORKDIR /app/server
RUN npm install

# 3. Set env and run
ENV PORT=8080
EXPOSE 8080
CMD ["node", "index.js"]
