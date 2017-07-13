const {logger} = require('../config');
const chalk = require('chalk');
const rp = require('request-promise');

const _constructOptions = (endpoint, qs) => {
    let options = {
        uri: endpoint,
        json: true,
        method: 'get',
        timeout: 25000
    };
    if (!!qs) {
        options.qs = qs;
    }
    return options;
};

const _execute = async (rp, options) => {
    let time = new Date().getTime();
    try {
        return await rp(options);
    } finally {
        time = new Date().getTime() - time;
        logger.info(`(${chalk.green('API')}) ${chalk.blue(options.method.toUpperCase())} ${chalk.yellow(options.uri)} ${chalk.blue(`${time} ms.`)}`);
    }
};

/**
 * Pokemon API Client
 */
class PokeApi {
    /**
     * @param {String} baseEndpoint base endpoint of the pokemon API
     */
    constructor(baseEndpoint) {
        this.baseEndpoint = baseEndpoint;
    }

    /**
     * Collect all available pokemon from the given offset.
     * @param {int} offset the paging offset
     * @return {Promise} Pokemon API List Response
     */
    async list(offset) {
        return await _execute(rp, _constructOptions(`${this.baseEndpoint}pokemon`, {offset: offset || 0}));
    }

    /**
     * Retrieve a specific Pokemon and all of its details
     * @param {int} id The ID of the pokemon to be retrieved
     * @return {Promise} Pokemon API Get Response
     */
    async get(id) {
        return await _execute(rp, _constructOptions(`${this.baseEndpoint}pokemon/${id}`));
    }
}

module.exports = {PokeApi};
