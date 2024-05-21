module.exports = {
    logger: {
        colorsEnabled: process.env.COLORS_ENABLED || 0,
        logLevel: process.env.LOG_LEVEL || 'warn',
        target: process.env.TARGET_FOLDER
    },
    server: {
        port: process.env.PORT || 3000
    }
};
