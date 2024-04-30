const { bgBlue, bgYellow, bgRed, disable: disableColors }  = require('colors/safe');
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


//function getLogger(moduleName,colorsEnabled,logLevel) {
    // switch(logLevel) {
    //     case 'info':
    //         return {
    //         info:(...args) => console.log(+colorsEnabled === 1 ? bgBlue(`${moduleName}:`) : `${moduleName}:`, ...args),
    //         warn:(...args) => console.error(+colorsEnabled === 1 ? bgYellow(`${moduleName}:`) : `${moduleName}:`, ...args),
    //         error:(...args) => console.error(+colorsEnabled === 1 ? bgRed(`${moduleName}:`) : `${moduleName}:`, ...args)
    //         }
    //         break;
    //     case 'warn':
    //         return {
    //             info:() =>{},
    //             warn:(...args) => console.error(+colorsEnabled === 1 ? bgYellow(`${moduleName}:`) : `${moduleName}:`, ...args),
    //             error:(...args) => console.error(+colorsEnabled === 1 ? bgRed(`${moduleName}:`) : `${moduleName}:`, ...args)
    //         }
    //         break;
    //     case 'error':
    //         return {
    //             info:() =>{},
    //             warn:() =>{},
    //             error:(...args) => console.error(+colorsEnabled === 1 ? bgRed(`${moduleName}:`) : `${moduleName}:`, ...args)
    //         }
    //     default:
    //         return {
    //             info:() =>{},
    //             warn:(...args) => console.error(+colorsEnabled === 1 ? bgYellow(`${moduleName}:`) : `${moduleName}:`, ...args),
    //             error:() =>{}
    //         }
    //         break;
    // }
//}

module.exports = getLogger;