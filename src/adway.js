const {convertToDnsBlackList} = require('./adwayDnsBlackListConverter');
const httpGet = require('./httpGet');
const sources = [
    "https://adaway.org/hosts.txt",
    "https://hosts-file.net/ad_servers.txt",
    "https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext"
];
let backList = [];
const oneDay = 24 * 60 * 60 * 1000;

setInterval(refresh, oneDay);

async function refresh() {
    console.log("ADWAY : refreshing list");
    backList.length = 0;
    for (const source of sources) {
        try {
            const httpResponse = await httpGet(source);
            const hosts = convertToDnsBlackList(httpResponse);
            backList  = backList.concat(hosts);
        } catch (e) {
            console.log("unable to get adway source : ", source, "error : ", e);
        }
    }
}


function haveDomain(domain) {
    return !!backList.find((element) => {
        return element === domain;
    });
}

refresh()
    .catch(e => {
        console.error(e);
    });
module.exports = {haveDomain};
