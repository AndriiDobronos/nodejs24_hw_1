const config = require('config');
const logger = require('./utils/logger')('secondary',config );

module.exports = {
    fn: () => {
        logger.info('other module log info message');
        logger.warn('other module log warn message');
    }
}