FROM mhart/alpine-node:10

ADD package.json /tmp/package.json

RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
 
WORKDIR /opt/app
ADD . /opt/app

EXPOSE 9000

CMD ["node", "app.js"]
