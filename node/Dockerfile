FROM node:10 
ENV PORT 4300
ENV DB_URL mongo-1:27017,mongo-2:27017,mongo-3:27017/3DD?replicaSet=mongo-cluster
ENV API_DOC_DIR ./apidoc
ENV NODE_ENV production
EXPOSE ${PORT}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx apidoc -i ./src/routes -o ${API_DOC_DIR}
HEALTHCHECK --interval=5m --timeout=3s \
    CMD curl -f http://localhost:${PORT}/ || exit 1
ENTRYPOINT ["npx", "pm2-runtime", "start", "deploy.json"]

