const express = require('express');
const requestTracker = require('./middleware/request-tracker');
const requestLogger = require('./middleware/request-logger');
const pokemonRoute = require('./pokemon');
const {config, logger} = require('./config');

const app = express();

app.use(requestTracker);
app.use(requestLogger);

app.use('/api/pokemon', pokemonRoute);

app.listen(config.port, () => {
    logger.info('The Amazing! PokeAPI is listening on port', config.port);
});

module.exports = app;
