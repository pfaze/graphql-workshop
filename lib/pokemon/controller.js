const {logger} = require('../config');
const validator = require('validator');
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const bodyParser = require('body-parser');
const schema = require('./graphql');
const {config} = require('../config');
const {addMockFunctionsToSchema} = require('graphql-tools');

if (config.mockGraphql) {
    addMockFunctionsToSchema({schema});
}

const _listPokemon = (api) => {
    return async (req, res) => {
        try {
            logger.debug('Retrieving available pokemon.');
            const results = await api.list(req.query.offset || 0);
            res.json(results);
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
    router.use('/graphiql', graphiqlExpress({
        endpointURL: '/api/pokemon/graphql',
        query: `query listPokemon {
  pokemon {
    id
    name
  }
}`
    }));
    router.use('/graphql', bodyParser.json(), graphqlExpress((req) => {
        return {
            schema: schema,
            formatError: (err) => ({
                message: err.message,
                details: err.stack
            }),
            context: {
                validator: validator,
                api: api,
                id: req.id
            }
        };
    }));
    router.get('/', _listPokemon(api));
    router.get('/:name', _getPokemon(api));
    return router;
};
