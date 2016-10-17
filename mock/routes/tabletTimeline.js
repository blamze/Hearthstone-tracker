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

router.get('/', function(req, res) {
    console.log(req.params);
    console.log(req.query);
    console.log(req.params.id);
    if (req.query.id && req.query.date) {
        db.any("SELECT " +
            "b.id AS booking_id, " +
            "r.room_id AS room_id, " +
            "b.from_date, " +
            "b.to_date, " +
            "b.description, " +
            "u.name AS person " +
            "FROM rooms r " +
            "LEFT JOIN bookings b ON b.room=r.room_id " +
            "LEFT JOIN users u ON u.id=b.person " +
            "WHERE ((b.isdeleted=false) AND (r.isdeleted=false) AND (r.room_id=$1) AND (b.from_date::timestamp::date=$2)) ", [req.query.id, req.query.date])

        .then(function(data) {
                // console.log(data);
                res.status(200).send({ data: data });
                // success;
            })
            .catch(function(error) {
                // console.log(error);
                res.status(500).send(error.message);
                // error;
            });
    } else {
        res.status(500).send("Invalid date or id");
    }
});

module.exports = router;