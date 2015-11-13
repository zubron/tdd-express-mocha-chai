var createMessageServer = require('../src/server');
var expect = require('chai').expect;

describe('Message Server', function() {
    var messageServer;

    beforeEach(function() {
        return createMessageServer()
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
    });
});
