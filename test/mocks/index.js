const nock = require('nock');

recordedResponses = nock.load(__dirname + '/pokemon-api-responses.json').forEach((n) => {
    n.log(console.log);
    n.persist();
});

module.exports = nock;
