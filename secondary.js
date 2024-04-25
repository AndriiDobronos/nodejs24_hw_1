const logger = require('./utils/logger')('secondary',null,'info');

module.exports = {
    fn: () => {
        logger.info('other module log info message');
        logger.warn('other module log warn message');
    }
}