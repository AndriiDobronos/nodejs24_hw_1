const { bgBlue, bgYellow, bgRed, disable: disableColors }  = require('colors/safe');
const path = require('path');
const fs = require('fs');

// не треба придумувати ускладнень, памятаєш, я розказував що весь код який знаходиться просто
// отак в самому модулі, він виконується один раз при першому підключенні модуля. Тому не треба привязувати до
// якихось подій в процесі чи де-інде ще, достатньо отак
// До того ж, ти троихи наплутав з розміщенням папки логів - вона має бути незалежна від таргета, просто самостійна
// папка в корні репозиторія
const logsFolderPath = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsFolderPath)) {
    fs.mkdirSync(logsFolderPath);
    console.log(`Папка ${logsFolderPath} була створена`);
}

// функція getLogger спрацовує щоразу коли ти робиш новий імпорт логгера кудись. А ці файлстріми мають бути створені один
// раз, при першому підключенні модуля логгер. Тому вони мають бути отут
const writeStreamInfo = fs.createWriteStream(path.join(logsFolderPath, 'info.log'));
const writeStreamError = fs.createWriteStream(path.join(logsFolderPath, 'error.log'));

// і закриття стрімов при завершенні програми також налаштовуємо один раз саме отут
process.once('beforeExit', ()=> {
    writeStreamInfo.end();
    writeStreamError.end();
    console.log('Всі файл стріми закрились');
});


function getLogger(moduleName, loggerConfig) {
    const { logLevel, colorsEnabled } = loggerConfig;

    process.emit('init_logger')


    if (+colorsEnabled === 0) {
        disableColors();
    }

    return {
        info: (...args) => {
            // інстанс об'єкта Дата (new Date()) зберігає в собі дату з точністю до мілісекунди
            // того момента коли цей інстанс був створений. Тож створити дату один раз і використовувати
            // її в кожному з методів не вийде - у тебе по всіх логах буде ОДНАКОВА ДАТА
            // Тому дату доведеться створювати нову щоразу, тут ніяк не спростити :)
            const logMoment = new Date().toISOString();
            writeStreamInfo.write(`${logMoment} : ${moduleName} : ${[...args]}\n`);

            if (logLevel !== 'info') return;
            console.log(bgBlue(`${moduleName}:`), ...args);
        },
        warn: (...args) => {
            const logMoment = new Date().toISOString();
            writeStreamError.write(`${logMoment} : ${moduleName} : ${[...args]}\n`);

            if (logLevel === 'error') return;
            console.error(bgYellow(`${moduleName}:`), ...args);
        },
        error: (...args) => {
            const logMoment = new Date().toISOString();
            writeStreamError.write(`${logMoment} : ${moduleName} : ${[...args]}\n`);

            console.error(bgRed(`${moduleName}:`), ...args);
        }
    }
}
module.exports = getLogger;