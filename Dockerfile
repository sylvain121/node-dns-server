FROM node:11.15.0

WORKDIR /tmp
RUN mkdir dns-server
ADD src/ /tmp/dns-server/
WORKDIR /tmp/dns-server
COPY index.js /tmp/
COPY package.json /tmp/
COPY package-lock.json /tmp/

RUN npm install
EXPOSE 3000
CMD ["node", "index.js"]
