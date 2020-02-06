FROM nginx:stable-alpine-perl

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/config.pm  /usr/share/nginx/perl/config.pm

# You must build the management tool before creating the docker image, or the
# image will not end up containing the management tool. Use the
# `npm run dockerize` command to both build the tool and the docker image.
COPY build            /usr/share/nginx/html
