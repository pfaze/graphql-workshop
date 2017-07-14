const nock = require('nock');
const {logger} = require('../lib/config');
const {describe, it} = require('mocha');
const assert = require('assert');
const fs = require('fs');
const request = require('supertest');
const app = require('../lib');

const record = process.env.RECORD === 'true' || false;

if (record) {
    nock.recorder.rec({
        dont_print: true,
        output_objects: true
    });
} else {
    require('./mocks');
}

describe('PokeAPI REST API tests', () => {
    before((done) => {
        logger.info('Initializing PokeAPI REST API test suite, record =', record);
        done();
    });
    after((done) => {
        logger.info('Finished PokeAPI REST API test suite.');
        if (!record) {
            done();
        } else {
            const mocks = nock.recorder.play();
            const file = fs.createWriteStream(`${__dirname}/mocks/pokemon-api-responses.json`, {
                flags: 'w'
            });
            file.write(JSON.stringify(mocks, null, 2), (err) => {
                if (err) {
                    logger.error('Unable to write recorded responses to file.');
                } else {
                    logger.info('The responses have been recorded and saved!');
                }
                done();
            });
        }
    });
    it('should retrieve the first 20 results', function (done) {
        this.timeout(25000);
        request(app)
            .get('/api/pokemon')
            .expect((response) => {
                assert.equal(response.body.length, 20);
            })
            .expect(200, done);
    });
    it('should retrieve the details for bulbasaur [id:1]', function (done) {
        this.timeout(25000);
        request(app).get('/api/pokemon/1')
            .expect((response) => {
                assert.equal(response.body.name, 'bulbasaur');
            })
            .expect(200, done);
    });
});