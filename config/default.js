const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    testValue: isProd ? 'this-is-prod' : process.env.TEST_VALUE,
    logger: {
        colorsEnabled: process.env.COLORS_ENABLED || 0,
        logLevel: process.env.LOG_LEVEL || 'warn'
    }
};