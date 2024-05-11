const fsAsync = require('fs/promises');
const path = require('path');
const config = require('config');
const logger = require('./utils/logger')('file_sync', config);

if(require.main === module) {
    logger.info('executed as a standalone script');
    this.start();
}

module.exports = {
    start: async function start(source,target) {
        try {
            const targetExists = await fsAsync.stat(target).then(() => true).catch(() => false)

            if (!targetExists) {
                await fsAsync.mkdir(target, { recursive: true })
                logger.info(`Каталог ${target} був створений`)
            }

            logger.warn(`Каталог ${target} вже існує`)
            const files = await fsAsync.readdir(source);
            logger.info(`список файлів та папок у каталозі source: [${files}]`)

            for (const file of files) {
                const sourcePath = path.join(source, file);
                const targetPath = path.join(target, file);

                const stats = await fsAsync.stat(sourcePath)

                if (stats.isDirectory()) {
                    logger.info(`поточний елемент ${sourcePath} це папка: ${stats.isDirectory()}`)
                    await start(sourcePath, targetPath);

                } else if (stats.isFile()) {
                    logger.info(`поточний елемент ${sourcePath} це файл: ${stats.isFile()}`)
                    const targetFileExists = await fsAsync.stat(targetPath).then(() => true).catch(() => false)
                    if (!targetFileExists) {
                        await fsAsync.copyFile(sourcePath, targetPath);
                        logger.info(`Файл ${file} був скопійований у ${target}`)

                    } else {
                        logger.warn(`Файл ${file} вже існує у каталозі ${target}`)
                    }
                }
            }
        } catch (error) {
            logger.error(`Сталася помилка: ${error.message}`)
        }
    }
}