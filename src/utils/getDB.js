const e = require('express');
const https = require('https')

const getRequest = () => {
    
    return new Promise((resolve, reject) => {
        
        const options = {

            hostname: 'api.wazirx.com',
            port: 443,
            path: '/api/v2/tickers',
            method: 'GET'
        }
        
        const req = https.request(options, (res) => {
            
            let data = '';

            res.on('data', (chunk) => {
                data += chunk.toString();
            })

            res.on('end', () => {

                if(res.statusCode === 200) {

                    data = JSON.parse(data);
                    resolve(data);
                }
                else {

                    reject(Error(`Error: ${res.statusCode}`));
                }
            });
        })
        
        req.on('error', error => {

            reject(error)
        })
        
        req.end()
    });
};

module.exports = getRequest;