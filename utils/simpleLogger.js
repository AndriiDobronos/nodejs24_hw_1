const { bgBlue, bgYellow, bgRed, disable: disableColors }  = require('colors/safe');

function getSimpleLogger(moduleName, loggerConfig) {
    const { logLevel, colorsEnabled } = loggerConfig;

    if (+colorsEnabled === 0) {
        disableColors();
    }

    return {
        info: (...args) => {
            if (logLevel !== 'info') return;
            console.log(bgBlue(`${moduleName}:`), ...args);
        },
        warn: (...args) => {
            if (logLevel === 'error') return;
            console.error(bgYellow(`${moduleName}:`), ...args);
        },
        error: (...args) => {
            console.error(bgRed(`${moduleName}:`), ...args);
        }
    }
}
module.exports = getSimpleLogger;