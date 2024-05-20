require('dotenv').config();
const { server: srvConfig } = require('config');
const { logger: loggerConfig} = require('config');
const express = require('express');
const morgan = require('morgan');
const  rfs = require("rotating-file-stream");
const path = require("path");
const logger = require('./utils/logger')('express srv',loggerConfig);
const date = new Date().toUTCString()

const { usersRouter } = require('./routers/users');

const app = express();
app.listen(srvConfig.port, () => logger.info(`server is listening on [${srvConfig.port}] port`));

const servePath = path.join(process.cwd(), 'logs', 'file.log');
const stream = rfs.createStream(servePath, {
    size: "1M",
    interval: "1d",
    compress: true  //"gzip"
});
const accessLogger = morgan(':date :method :url :status',{stream});
app.use(accessLogger);

app.use(morgan(':date :method :url :status'));

app.use(express.json());

app.use('/users', usersRouter);

if(require.main === module) {
    logger.info('executed as a standalone script');
    this.server_express;
}

module.exports = {
    server_express: ()=> {
        console.log(`Server started from point: main.js`)
    }
};