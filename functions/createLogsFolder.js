const path = require('path');
const fs = require('fs');

function createLogsFolder(target) {
    const logsFolderPath = path.join(__dirname, target);

    if (!fs.existsSync(logsFolderPath)) {
        fs.mkdirSync(logsFolderPath);
        console.log(`Папка ${target} була створена`);

        fs.createWriteStream(path.join(logsFolderPath, 'info.log.txt'))
        //fs.writeFileSync(path.join(logsFolderPath, 'info.log.txt'), '');

        fs.createWriteStream(path.join(logsFolderPath, 'error.log.txt'))
        //fs.writeFileSync(path.join(logsFolderPath, 'error.log.txt'), '');
        console.log(`Файлы 'info.log.txt' и 'error.log.txt' були створені`);
    } else {
        const files = fs.readdirSync(logsFolderPath);
        if (!files.includes('info.log.txt')) {
            fs.createWriteStream(path.join(logsFolderPath, 'info.log.txt'))
            //fs.writeFileSync(path.join(logsFolderPath, 'info.log.txt'), '');
            console.log(`Файл 'info.log.txt' був створений`);
        }
        if (!files.includes('error.log.txt')) {
            //fs.createWriteStream(`${target}/error.log.txt`)
            fs.writeFileSync(path.join(logsFolderPath, 'error.log.txt'), '');
            console.log(`Файл 'error.log.txt' був створений`);
        }
    }
}
module.exports = createLogsFolder;