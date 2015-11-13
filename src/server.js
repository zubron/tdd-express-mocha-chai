var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(port) {
    var app = express();

    app.use(bodyParser.text({
        type: 'application/json'
    }));

    app.post('/messages', function (req, res) {
        var reqBody = JSON.parse(req.body);

        if(reqBody.message === undefined) {
            res.sendStatus(400);
            return;
        }

        var body = {
            message: reqBody.message
        };
        res.status(201).send(body);
    });

    return new Promise(function(resolve, reject) {
        var server = app.listen(port, function() {
            resolve(server);
        });
    });
};
