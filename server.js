const http = require('node:http');
require('dotenv').config();
const { server: serverConfig, logger: loggerConfig } = require('config');
const logger = require('./utils/logger')('server', loggerConfig);
const srv = http.createServer();

srv.listen(serverConfig);
srv.on('listening',()=> {
    console.log(`Server listening on port:  [${serverConfig.port}]`)
});

srv.on('request', (req, _resp) => logger.info(`incoming request: [${req.method}] ${req.url}`));

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
});

if(require.main === module) {
    logger.info('executed as a standalone script');
    this.server;
}

module.exports = {
    server: ()=> {
        console.log(`Server started from point: main.js`)
    }
}