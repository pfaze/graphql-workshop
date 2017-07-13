const config = require('../config');
const chalk = require('chalk');
const winston = require('winston');

config.env = process.env.ENV || 'development';
config.mock = process.env.MOCK === 'true' || false;
config.port = process.env.PORT || '3000';

winston.emitErrs = true;

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: true
        })
    ],
    exitOnError: false
});

logger.info('Running in profile', config.env);

if (config.mock) {
    logger.warn('Running in', chalk.red('mock profile,'), 'pokemon api responses are mocked.');
    require('../test/mocks');
}

module.exports = {config, logger};

