const request = require('request');

function get(address) {
    console.log(address);
    return new Promise((resolve, reject) => {
        request(address, (err, res, body) => {
            if(err) {
                console.log("REQUEST ERR", err);
                return reject(err);
            }
            return resolve(body);
        });
    });
}


module.exports = get;


