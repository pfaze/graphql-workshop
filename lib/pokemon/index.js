const router = require('express').Router();
const controller = require('./controller');
const PokeAPI = require('./client').PokeApi;
const {config} = require('../config');

module.exports = controller(router, new PokeAPI(config.pokemon.api.endpoint));
