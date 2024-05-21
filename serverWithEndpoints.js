const http = require('node:http');
require('dotenv').config();
const { server: serverConfig, logger: loggerConfig } = require('config');
const logger = require('./utils/logger')('server', loggerConfig);
const srv = http.createServer();
const fs = require('fs');
const path = require('path');

const CONTENT_TYPES = {
    js: 'text/javascript',
    css: 'text/css',
    html: 'text/html',
    mp4: 'video/mp4'
};

srv.listen(serverConfig);
srv.on('listening',()=> {
    console.log(`Server listening on port:  [${serverConfig.port}]`)
});

function sendNotFound(req, resp) {
    logger.warn(`${req.method} ${req.url} - requested resource does not exist`);
    resp.writeHead(404);
    resp.end();
}

function handleRoot(req, resp) {
    req.url = '/static/index.html';
    handleStatic(req, resp);
}

function handleStatic(req, resp) {
    const dataType = CONTENT_TYPES[req.url.split('.').pop()];
    resp.setHeader('content-type', dataType);

    const filePath = path.join(process.cwd(), req.url);
    try {
        fs.accessSync(filePath);
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(resp);
    } catch (error) {
        // unknown resource
        resp.statusCode = 404;
        resp.end();
    }
}

const endpoints = {
    '^/$': {
        GET: [handleRoot]
    },
    '^/static/.*(css|js|html)$': {
        GET: [handleStatic]
    },
    '^/data$': {
        GET: [serveVideoFile],
        POST: [parseReqBody, handleData]
    }
}

async function parseReqBody(req, _resp) {
    const bodyParts = [];
    for await (const chunk of req) {
        bodyParts.push(chunk);
    }
    const incomingJson = JSON.parse(Buffer.concat(bodyParts).toString());
    req.body = incomingJson;
}

function handleData(req, resp) {
    logger.info('received data:', req.body);
    resp.end('request data received!');
}

function serveVideoFile(_req, resp) {
    const videoPath = path.join(process.cwd(), 'source', 'birds.mp4'); // hardcoded, but let it be for now
    const videoStream = fs.createReadStream(videoPath);

    resp.setHeader('content-type', CONTENT_TYPES.mp4);
    videoStream.pipe(resp);
}

// main entry point to process any incoming request
srv.on('request', async (req, resp) => {
    //! 1. searching for endpoint handlers based on url template as a key
    //console.log('searching for endpoint handlers based on url template as a key')
    const [, handlersByMethods = {}] = Object.entries(endpoints).find(([urlTemplate]) => {
        const regExp = new RegExp(urlTemplate);
        return regExp.test(req.url);
    }) || [];

    //! 2. getting a middleware chain based on request method. If no handlers found, we default to sendNotFound
    const middlewareChain = handlersByMethods[req.method] || [sendNotFound];

    try {
        //! 3. middleware list items are being executed one by one in the order they are in the array
        for (let i = 0; i < middlewareChain.length; i +=1 ) {
            await middlewareChain[i](req, resp);
        }
    } catch (err) {
        logger.error(err);

        //! 4. any middleware can throw an error to stop the process
        const respStatus = err.status || 500;
        const respData = err.data || 'Server error, try again later';

        resp.statusCode = respStatus;
        resp.end(JSON.stringify(respData));
    }
});

if(require.main === module) {
    logger.info('executed as a standalone script');
    this.serverrWithEndpoints;
}

module.exports = {
    serverWithEndpoints: ()=> {
        console.log(`Server started from point: main.js`)
    }
}