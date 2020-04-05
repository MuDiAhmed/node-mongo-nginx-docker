FROM mongo

COPY setup.sh /docker-entrypoint-initdb.d/
RUN chmod 777 /docker-entrypoint-initdb.d/setup.sh

CMD ["--replSet","mongo-cluster"]