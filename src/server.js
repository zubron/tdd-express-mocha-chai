var express = require('express');

module.exports = function() {
    var app = express();

    return new Promise(function(resolve, reject) {
        var server = app.listen(8000, function() {
            resolve(server);
        });
    });
};
