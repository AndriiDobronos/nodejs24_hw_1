const http = require('node:http');
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');
const logger = require('./utils/logger')('server', config);
const srv = http.createServer();
const port = 3030;

srv.listen(port);
srv.on('listening',()=> {
    console.log(`Server listening on port: [${port}]`)
});

srv.on('request', (req, resp) => {

    if (req.method === 'GET' && req.url === '/healthcheck') {
        resp.statusCode = 200;
        resp.setHeader('content-type', 'text/Auto');
        logger.info(`${req.method} ${req.url} ${resp.statusCode}`)
        resp.end('healthcheck passed');
        return;
    } else {
        resp.statusCode = 404;
        resp.setHeader('content-type', 'text/Auto');
        logger.warn(`${req.method} ${req.url} ${resp.statusCode}`)
        resp.end();
        return;
    }
})

module.exports = {
    server: ()=> {
        console.log(`Server started from point: main.js`)
    }
}