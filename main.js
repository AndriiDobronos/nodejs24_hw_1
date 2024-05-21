require('dotenv').config();
const { logger: loggerConfig } = require('config');
const logger = require('./utils/logger')('main', loggerConfig);

logger.info('info message : the script is running!');
logger.warn('warn message');
logger.error('error message');

const { fn } = require('./secondary');
fn();

const fileSync = require('./file_sync');
fileSync.start('source','target');

const {server} = require('./server');
server();