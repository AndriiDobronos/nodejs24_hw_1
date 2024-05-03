const { bgBlue, bgYellow, bgRed, disable: disableColors }  = require('colors/safe');
const path = require('path');
const fs = require('fs');

//*** createLogsFolder був перший варіант для колбека на подію 'init_logger'***
const createLogsFolder = require('../functions/createLogsFolder.js')

function getLogger(moduleName, loggerConfig) {
    const { logLevel, colorsEnabled, target} = loggerConfig;
    const logsFolderPath = path.join(__dirname, target);
    const writeStreamInfo = fs.createWriteStream(path.join(logsFolderPath, 'info.log.txt'))
    const writeStreamError = fs.createWriteStream(path.join(logsFolderPath, 'error.log.txt'))
    const date = new Date().toLocaleString()
    process.emit('init_logger')
    process.once('init_logger',()=> {
        !fs.existsSync(logsFolderPath) ?
            (fs.mkdirSync(logsFolderPath), console.log(`Папка ${target} була створена`)) :
        console.log(`Папка ${target} вже існує`);
    });

    process.once('beforeExit',()=> {
        writeStreamInfo.end();
        writeStreamError.end();
        console.log('Stream закрився')})
    process.on('exit',()=>console.log('finish'))

    if (+colorsEnabled === 0) {
        disableColors();
    }

    return {
        info: (...args) => {
            //Якщо треба зберігати усю історію info для усіх викликів logger:
            //fs.appendFileSync((path.join(logsFolderPath, 'info.log.txt')),`${date} : ${moduleName} : ${[...args]}\n`)

            writeStreamInfo.write(`${date} : ${moduleName} : ${[...args]}\n`)
            if (logLevel !== 'info') return;
            console.log(bgBlue(`${moduleName}:`), ...args);

        },
        warn: (...args) => {
            //Якщо треба зберігати історію з усіх викликів logger:
            //fs.appendFileSync((path.join(logsFolderPath, 'error.log.txt')),`${date} : ${moduleName} : ${[...args]}\n`)

            writeStreamError.write(`${date} : ${moduleName} : ${[...args]}\n`)
            if (logLevel === 'error') return;
            console.error(bgYellow(`${moduleName}:`), ...args);
        },
        error: (...args) => {
            //Якщо треба зберігати історію з усіх викликів logger:
            //fs.appendFileSync((path.join(logsFolderPath, 'error.log.txt')),`${date} : ${moduleName} : ${[...args]}\n`)

            writeStreamError.write(`${date} : ${moduleName} : ${[...args]}\n`)
            console.error(bgRed(`${moduleName}:`), ...args);
        }
    }
}
module.exports = getLogger;