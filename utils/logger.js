const { bgBlue, bgYellow, bgRed, disable: disableColors }  = require('colors/safe');

function getLogger(moduleName, loggerConfig) {
    const { logLevel, colorsEnabled } = loggerConfig;

    if (+colorsEnabled === 0) {
        disableColors();
    }

    return {
        info:(...args) => {
            if (logLevel !== 'info') return;
            console.log(bgBlue(`${moduleName}:`), ...args);
        },
        warn:(...args) => {
            if (logLevel === 'error') return;
            console.error(bgYellow(`${moduleName}:`), ...args);
        },
        // а тут додаткової логіки взагалі не треба, бо метод працює при будь-яких значеннях LOG_LEVEL, правда? :)
        error:(...args) => console.error(bgRed(`${moduleName}:`), ...args)
    }
}

module.exports = getLogger;