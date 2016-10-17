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

router.get('/', function (req, res) {
    console.log(req.params);
    console.log(req.query);
    console.log(req.params.id);

    db.any("SELECT " +
        "b.id, " +
        "u.name AS person, " +
        "r.name AS room_name, " +
        "b.description, " +
        "b.from_date, " +
        "b.to_date " +
        "FROM bookings b " +
        "LEFT JOIN users u ON u.id = b.person " +
        "LEFT JOIN rooms r ON r.room_id = b.room " +
        "WHERE b.from_date::timestamp::date = $1 AND b.room = $2", [req.query.date, req.query.id])
        .then(function (data) {
            // console.log(data);
            res.status(200).send({data: data});
            // success;
        })
        .catch(function (error) {
            // console.log(error);
            res.status(500).send(error.message);
            // error;
        });
});

module.exports = router;

