const logger = require('./utils/logger')('secondary',1,'info');

module.exports = {
    fn: () => {
        logger.info('other module log info message');
        logger.warn('other module log warn message');
    }
}