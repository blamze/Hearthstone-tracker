var pgp = require('pg-promise')();
var dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'booking-room-system',
    user: 'postgres',
    password: 'postgres'
};
var db = pgp(dbConfig);
var chance = require('chance').Chance();
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {

    if (req.body.username !== '' && req.body.password !== '') {
        db.one("select u.*, p.name as position_name from users u join positions p on u.position = p.id where username=$1 AND password=$2", [req.body.username, req.body.password])
            .then(function (data) {
                res.status(200).send({data: data, token: chance.hash()});
            })
            .catch(function (error) {
                res.status(500).send(error.message);
            });
    }
    else {
        res.status(404).send("Invalid username or password");
    }
});

module.exports = router;

