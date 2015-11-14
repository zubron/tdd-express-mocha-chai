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

        it('should accept GET requests to /messages', function() {
            var request = {
                method: 'GET',
                json: true,
                uri: url + '/messages',
                resolveWithFullResponse: true
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

            it('should have a message in the response', function() {
                expect(response.body).to.have.property('message');
            });

            it('should respond with the sent message', function() {
                expect(response.body).to.have.deep.property('message', request.body.message);
            });
        });

        context('when an invalid request is made', function() {
            var response;
            var request = {
                method: 'POST',
                json: true,
                uri: url + '/messages',
                simple: false,
                resolveWithFullResponse: true,
                body: {
                    invalidMessage: 'Dogs are better'
                }
            };

            beforeEach(function makeRequest() {
                return rp(request)
                    .then(function(r) {
                        response = r;
                    });
            });

            it('should respond with 400', function() {
                expect(response.statusCode).to.equal(400);
            });

            it('should respond with an error status', function() {
                expect(response.body).to.have.property('error');
            });

            it('should respond with an error status that is true', function() {
                expect(response.body).to.have.deep.property('error', true);
            });
        });
    });

    describe('retrieving messages', function() {
        context('when a valid request is received', function() {
            var response;
            var request = {
                method: 'GET',
                json: true,
                uri: url + '/messages',
                resolveWithFullResponse: true
            };

            beforeEach(function makeRequest() {
                return rp(request)
                    .then(function(r) {
                        response = r;
                    });
            });

            it('should respond with 200', function() {
                expect(response.statusCode).to.equal(200);
            });

            it('should respond with a valid JSON body', function () {
                expect(response.body).to.be.an('object');
            });

            it('should respond with messages', function() {
                expect(response.body).to.have.property('messages');
            });

            it('should respond with no messages when no messages have been sent', function() {
                // No messages have been added, return an empty array
                expect(response.body.messages).to.have.length(0);
            });
        });

        context('when a message has been posted', function() {
            var response;
            var createMessageRequest = {
                method: 'POST',
                json: true,
                uri: url + '/messages',
                body: {
                    message: 'Cats are cute'
                }
            };

            var getMessagesRequest = {
                method: 'GET',
                json: true,
                uri: url + '/messages'
            };

            var makeCreateRequest = function () {
                return rp(createMessageRequest);
            };

            var makeGetRequest = function () {
                return rp(getMessagesRequest);
            };

            beforeEach(function makeRequest() {
                return makeCreateRequest()
                    .then(makeGetRequest)
                    .then(function(r) {
                        response = r;
                    });
            });

            it('should return one message', function() {
                expect(response.messages).to.have.length(1);
            });
        });
    });
});
