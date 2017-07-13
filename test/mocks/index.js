const nock = require('nock');

recordedResponses = nock.load(__dirname + '/pokemon-api-responses.json');

module.exports = nock;
