const { bgBlue, bgYellow, bgRed }  = require('colors/safe');

function getLogger(moduleName, loggerConfig) {
    const { logLevel, colorsEnabled } = loggerConfig;

    switch(logLevel) {
        case 'info':
            return {
            info:(...args) => console.log(+colorsEnabled === 1 ? bgBlue(`${moduleName}:`) : `${moduleName}:`, ...args),
            warn:(...args) => console.error(+colorsEnabled === 1 ? bgYellow(`${moduleName}:`) : `${moduleName}:`, ...args),
            error:(...args) => console.error(+colorsEnabled === 1 ? bgRed(`${moduleName}:`) : `${moduleName}:`, ...args)
            }
            break;
        case 'warn':
            return {
                info:() =>{},
                warn:(...args) => console.error(+colorsEnabled === 1 ? bgYellow(`${moduleName}:`) : `${moduleName}:`, ...args),
                error:(...args) => console.error(+colorsEnabled === 1 ? bgRed(`${moduleName}:`) : `${moduleName}:`, ...args)
            }
            break;
        case 'error':
            return {
                info:() =>{},
                warn:() =>{},
                error:(...args) => console.error(+colorsEnabled === 1 ? bgRed(`${moduleName}:`) : `${moduleName}:`, ...args)
            }
        default:
            return {
                info:() =>{},
                warn:(...args) => console.error(+colorsEnabled === 1 ? bgYellow(`${moduleName}:`) : `${moduleName}:`, ...args),
                error:() =>{}
            }
            break;
    }
}

module.exports = getLogger;