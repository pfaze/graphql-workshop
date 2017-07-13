const {logger} = require('../config');
const validator = require('validator');

const _pokemonIdRegEx = /^http:\/\/pokeapi\.co\/api\/v2\/pokemon\/([0-9]*)\/$/;

const _listPokemon = (api) => {
    return async (req, res) => {
        try {
            logger.debug('Retrieving available pokemon.');
            const result = await api.list(req.query.offset || 0);
            res.json(result.results.map((p) => {
                return {
                    id: _pokemonIdRegEx.test(p.url) ? _pokemonIdRegEx.exec(p.url)[1] : null,
                    name: p.name
                };
            }));
        } catch (error) {
            logger.error('Unable to retrieving available pokemon.', error);
            res.sendStatus(503);
        }
    };
};

const _getPokemon = (api) => {
    return async (req, res) => {
        const name = validator.escape(req.params.name);
        try {
            logger.debug('Retrieving details for pokemon:', name);
            const results = await api.get(req.params.name);
            res.json(results);
        } catch (error) {
            logger.error('Unable to retrieve details for pokemon:', name, error);
            res.sendStatus(503);
        }
    };
};

module.exports = (router, api) => {
    logger.debug('Initializing pokemon API router.');
    router.get('/', _listPokemon(api));
    router.get('/:name', _getPokemon(api));
    return router;
};
