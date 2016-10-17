var pgp = require('pg-promise')();
var dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'booking-room-system',
    user: 'postgres',
    password: 'postgres'
};
var db = pgp(dbConfig);
var express = require('express');
var router = express.Router();

router.get('/roles', function(req, res) {
    db.any("SELECT * FROM roles", [])
        .then(function (data) {
            // console.log(data);
            res.status(200).send({ data: data});
            // success;
        })
        .catch(function (error) {
            // console.log(error);
            res.status(500).send(error.message);
            // error;
        });
});

router.get('/positions', function(req, res) {
    db.any("SELECT * FROM positions", [])
        .then(function (data) {
            // console.log(data);
            res.status(200).send({ data: data });
            // success;
        })
        .catch(function (error) {
            // console.log(error);
            res.status(500).send(error.message);
            // error;
        });
});

module.exports = router;
