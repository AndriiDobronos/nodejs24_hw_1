const dotenv = require('dotenv');
dotenv.config();

const config = require('config');
const {logLevel} = require("./config/default");
const info = logLevel.slice(1,5);
const warn = logLevel.slice(6,10);
const error = logLevel.slice(6,10);

const logger = require('./utils/logger')('main',config.colorsEnabled,info);

logger.info('info message : the script is running!');

const { fn } = require('./secondary');
fn();

logger.warn('warn message with nodemon');
logger.error('error message');

console.log(config.testValue);
console.log(config.logLevel.slice(1,5));
console.log(config.logLevel.slice(6,10));
console.log(config.logLevel.slice(11,16));