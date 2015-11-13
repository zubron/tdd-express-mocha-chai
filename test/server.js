var createMessageServer = require('../src/server');
var expect = require('chai').expect;
var rp = require('request-promise');

describe('Message Server', function() {
    var messageServer;
    var port = 8080;
    var url = 'http://localhost:' + port;

    beforeEach(function() {
        return createMessageServer(port)
            .then(function(server) {
                messageServer = server;
            });
    });

    afterEach(function(done) {
        messageServer.close(function() {
            done();
        });
    });

    describe('the instance', function () {
        it('should exist', function() {
            expect(messageServer).to.exist;
        });

        it('should be listening on a specified port', function() {
            expect(messageServer.address().port).to.equal(port);
        });

        it('should accept POST requests to /messages', function() {
            var request = {
                method: 'POST',
                json: true,
                uri: url + '/messages',
                resolveWithFullResponse: true,
                body: {
                    message: 'Cats are cute'
                }
            };

            return rp(request)
                .then(function(response) {
                    expect(response.statusCode).to.not.equal(404);
                });
        });
    });

    describe('creating a message', function() {
        context('when a valid message is received', function() {
            var response;
            var request = {
                method: 'POST',
                json: true,
                uri: url + '/messages',
                resolveWithFullResponse: true,
                body: {
                    message: 'Cats are cute'
                }
            };

            beforeEach(function makeRequest() {
                return rp(request)
                    .then(function(r) {
                        response = r;
                    });
            });

            it('should respond with 201', function() {
                expect(response.statusCode).to.equal(201);
            });

            it('should respond with a valid JSON body', function () {
                expect(response.body).to.be.an('object');
            });
        });
    });
});
