const { bgBlue, bgYellow, bgRed, disable: disableColors }  = require('colors/safe');
const path = require('path');
const fs = require('fs');

function getLogger(moduleName, loggerConfig) {
    const { logLevel, colorsEnabled, target} = loggerConfig;
    const logsFolderPath = path.join(__dirname, target);
    const writeStreamInfo = fs.createWriteStream(path.join(logsFolderPath, 'info.log'))
    const writeStreamError = fs.createWriteStream(path.join(logsFolderPath, 'error.log'))
    const date = new Date().toLocaleString()

    process.once('init_logger',()=> {
        !fs.existsSync(logsFolderPath) ?
            (fs.mkdirSync(logsFolderPath), console.log(`Папка ${target} була створена`)) :
        console.log(`Папка ${target} вже існує`);
    });
    process.emit('init_logger')

    process.once('beforeExit',()=> {
        writeStreamInfo.end();
        writeStreamError.end();
        console.log('Stream закрився')})

    if (+colorsEnabled === 0) {
        disableColors();
    }

    return {
        info: (...args) => {
            writeStreamInfo.write(`${date} : ${moduleName} : ${[...args]}\n`)
            if (logLevel !== 'info') return;
            console.log(bgBlue(`${moduleName}:`), ...args);
        },
        warn: (...args) => {
            writeStreamError.write(`${date} : ${moduleName} : ${[...args]}\n`)
            if (logLevel === 'error') return;
            console.error(bgYellow(`${moduleName}:`), ...args);
        },
        error: (...args) => {
            writeStreamError.write(`${date} : ${moduleName} : ${[...args]}\n`)
            console.error(bgRed(`${moduleName}:`), ...args);
        }
    }
}
module.exports = getLogger;