var express = require('express');

module.exports = function(port) {
    var app = express();

    app.post('/messages', function (req, res) {
        var body = {
            message: 'foo'
        };
        res.status(201).send(body);
    });

    return new Promise(function(resolve, reject) {
        var server = app.listen(port, function() {
            resolve(server);
        });
    });
};
