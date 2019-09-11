const {haveDomain} = require('./adway');
const dns = require('dns');
var named = require('./lib/index');
var server = named.createServer();
var ttl = 300;
const port = 3000
server.listen(port, '0.0.0.0', function () {
    console.log('DNS server started on port ' + port);
});

server.on('query', function (query) {
    var domain = query.name();
    console.log('DNS Query: %s', domain);
    if (haveDomain(domain)) {
        console.log("domain", domain, "is blacklisted");
        var target = new named.ARecord('127.0.0.1');
        query.addAnswer(domain, target, ttl);
        server.send(query);
    } else {
        dns.lookup(domain, null, (err, address, family) => {
            console.log('address: %j family: IPv%s', address, family);
            var target = new named.ARecord(address);
            query.addAnswer(domain, target, ttl);
            server.send(query);
        });
    }

});
