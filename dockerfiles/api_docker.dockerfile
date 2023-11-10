FROM nginx:1.25-bookworm

COPY ./nginx/nginx.conf /etc/nginx/
COPY ./nginx/conf.d /etc/nginx/conf.d/
COPY ./dist_docker /srv/www
