const {logger} = require('../config');
const chalk = require('chalk');
const onFinished = require('on-finished');

module.exports = (req, res, next) => {
    logger.rewriters.push((level, msg, meta) => {
        meta.id = chalk.yellow(req.id);
        return meta;
    });
    req._time = new Date().getTime();
    onFinished(res, () => {
        time = new Date().getTime() - req._time;
        logger.info(`(${chalk.green('WEB')}) ${chalk.blue(req.method)} ${chalk.yellow(req.url)} ${chalk.blue(`${time} ms.`)} ${res.statusCode}`);
    });
    next();
};
