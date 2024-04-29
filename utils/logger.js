const { bgBlue, bgYellow, bgRed, disable: disableColors }  = require('colors/safe');

function getLogger(moduleName, loggerConfig) {
    const { logLevel, colorsEnabled } = loggerConfig;

    if (+colorsEnabled === 0) {
        disableColors();
    }

    switch(logLevel) {
        case 'info':
            return {
            info:(...args) => console.log(bgBlue(`${moduleName}:`), ...args),
            warn:(...args) => console.error(bgYellow(`${moduleName}:`), ...args),
            error:(...args) => console.error(bgRed(`${moduleName}:`), ...args)
            }
            break;
        case 'warn':
            return {
                info:() =>{},
                warn:(...args) => console.error(bgYellow(`${moduleName}:`), ...args),
                error:(...args) => console.error(bgRed(`${moduleName}:`), ...args)
            }
            break;
        case 'error':
            return {
                info:() =>{},
                warn:() =>{},
                error:(...args) => console.error(bgRed(`${moduleName}:`), ...args)
            }
        default:
            return {
                info:() =>{},
                warn:(...args) => console.error(bgYellow(`${moduleName}:`), ...args),
                error:() =>{}
            }
            break;
    }
}

module.exports = getLogger;