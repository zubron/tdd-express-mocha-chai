var express = require('express');

module.exports = function(port) {
    var app = express();

    return new Promise(function(resolve, reject) {
        var server = app.listen(port, function() {
            resolve(server);
        });
    });
};
