# node-dns-server

Nodejs dns server base en node-named module (https://github.com/trevoro/node-named).

### build image

```bash

sudo docker build -t node-dns-server .

```

### start image
```bash

sudo docker run -ti -p 53:3000/udp node-dns-server

```
