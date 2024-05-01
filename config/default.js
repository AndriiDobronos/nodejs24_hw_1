//const isProd = process.env.NODE_ENV === 'production';
//const testValue: isProd ? 'this-is-prod' : process.env.TEST_VALUE
//const isProd = process.env.NODE_ENV === 'production';
//const testValue: isProd ? 'this-is-prod' : process.env.TEST_VALUE

module.exports = {
    colorsEnabled: process.env.COLORS_ENABLED || 0,
    logLevel: process.env.LOG_LEVEL || 'warn'
};