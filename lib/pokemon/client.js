const {logger} = require('../config');
const chalk = require('chalk');
const rp = require('request-promise');

const _pokemonIdRegEx = /^http:\/\/pokeapi\.co\/api\/v2\/pokemon\/([0-9]*)\/$/;

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
        const result = await _execute(rp, _constructOptions(`${this.baseEndpoint}pokemon`, {offset: offset || 0}));
        return result.results.map((p) => {
            return {
                id: _pokemonIdRegEx.test(p.url) ? _pokemonIdRegEx.exec(p.url)[1] : null,
                name: p.name
            };
        });
    }

    /**
     * Retrieve a specific Pokemon and all of its details
     * @param {int} id The ID of the pokemon to be retrieved
     * @return {Promise} Pokemon API Get Response
     */
    async get(id) {
        const result = await _execute(rp, _constructOptions(`${this.baseEndpoint}pokemon/${id}`));
        return {
            id: id,
            name: result.name,
            weight: result.weight,
            base_experience: result.base_experience,
            stats: result.stats.map((s) => {
                return {
                    name: s.stat.name,
                    effort: s.effort,
                    base_state: s.base_stat
                };
            }),
            moves: result.moves.map((m) => m.move.name),
            abilities: result.abilities.map((a) => a.ability.name)
        };
    }
}

module.exports = {PokeApi};
