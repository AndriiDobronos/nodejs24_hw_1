const dotenv = require('dotenv');
dotenv.config();

const config = require('config');
const {logLevel} = require("./config/default");

const logger = require('./utils/logger')('main',config.colorsEnabled,logLevel);

logger.info('info message : the script is running!');

const { fn } = require('./secondary');
fn();

logger.warn('warn message');
logger.error('error message');

console.log(config.testValue);
console.log(config.colorsEnabled)
console.log(logLevel)
