var pgp = require('pg-promise')();
var dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'hearthstone',
    user: 'postgres',
    password: 'postgres'
};
var db = pgp(dbConfig);
var chance = require('chance').Chance();
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
  var data = req.body;
    if (data.username !== '' && data.password !== '') {
        db.one("select u.* from users u where email=$1 AND password=$2", [data.email, data.password])
            .then(function (data) {
                res.status(200).send({data: data.username, token: chance.hash()});
            })
            .catch(function () {
                res.status(500).send("Bad username or password");
            });
    }
    else {
        res.status(404).send("Insert username and password");
    }
});

module.exports = router;

