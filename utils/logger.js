let property = '';

function info(msg) {
    console.log(property,':',msg);
}

function warn(msg) {
    console.error(msg);
}

function error(msg) {
    console.error(msg);
}

function logger(arg)  {
    property = arg
    return {info, warn, error}
}

module.exports = logger;