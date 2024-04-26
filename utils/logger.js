const { bgBlue, bgYellow, bgRed }  = require('colors/safe');

function getLogger(moduleName,colorsEnabled,logLevel) {
    switch(logLevel) {
        case 'info':
            return {
            info:(...args) => console.log(colorsEnabled ? bgBlue(`${moduleName}:`) : `${moduleName}:`, ...args),
            warn:(...args) => console.error(colorsEnabled ? bgYellow(`${moduleName}:`) : `${moduleName}:`, ...args),
            error:(...args) => console.error(colorsEnabled ? bgRed(`${moduleName}:`) : `${moduleName}:`, ...args)
            }
            break;
        case 'warn':
            return {
                info:() =>{},
                warn:(...args) => console.error(colorsEnabled ? bgYellow(`${moduleName}:`) : `${moduleName}:`, ...args),
                error:(...args) => console.error(colorsEnabled ? bgRed(`${moduleName}:`) : `${moduleName}:`, ...args)
            }
            break;
        case 'error':
            return {
                info:() =>{},
                warn:() =>{},
                error:(...args) => console.error(colorsEnabled ? bgRed(`${moduleName}:`) : `${moduleName}:`, ...args)
            }
        default:
            return {
                info:() =>{},
                warn:(...args) => console.error(colorsEnabled ? bgYellow(`${moduleName}:`) : `${moduleName}:`, ...args),
                error:() =>{}
            }
            break;
    }
}

module.exports = getLogger;