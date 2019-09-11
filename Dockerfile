FROM node:11.15.0

WORKDIR /tmp
RUN mkdir dns-server
ADD src/ /tmp/dns-server/
WORKDIR /tmp/dns-server

RUN npm install
EXPOSE 3000/udp

CMD ["node", "index.js"]
