FROM node:9.9.0

WORKDIR /usr/src/app
ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install -g serve
EXPOSE 5000

COPY package.json package.json
RUN npm install

COPY . .

CMD ["/usr/src/app/run"]