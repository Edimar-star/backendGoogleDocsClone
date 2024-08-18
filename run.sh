# !/bin/bash

docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker run --name $CONTAINER_NAME -d -p $DB_PORT:$DB_PORT -e MONGO_INITDB_ROOT_USERNAME=$DB_USER -e MONGO_INITDB_ROOT_PASSWORD=$DB_PASSWORD -e MONGO_INITDB_DATABASE=$DB_DATABASE -v ~/mongo-data:/data/db mongo:latest