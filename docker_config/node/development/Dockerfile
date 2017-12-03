FROM crudapi_django

COPY ./docker_config/node/development/n_start.sh /n_start.sh
RUN chmod +x /n_start.sh
RUN echo "NPM Reallyyyyyyyyyy INSTALLING"
WORKDIR /code
RUN npm install