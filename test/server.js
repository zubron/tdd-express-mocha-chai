var createMessageServer = require('../src/server');
var expect = require('chai').expect;

describe('Message Server', function() {
    var messageServer;
    var port = 8080;

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
    });
});
