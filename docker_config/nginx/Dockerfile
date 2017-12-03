FROM crudapi_django

WORKDIR /code
COPY ./docker_config/nginx/server.sh /server.sh
RUN chmod +x /server.sh

RUN apt-get update
  
RUN apt-get install -y nginx

CMD [ "service", "nginx", "start" ]