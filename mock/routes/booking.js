var _ = require('lodash');
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

router.get('/', function (req, res) {
    db.any("SELECT " +
            "b.id," +
            "r.name AS room_name," +
            "u.name as person," +
            "b.from_date," +
            "b.to_date," +
            "b.description," +
            "b.participants," +
            "r.size " +
            "FROM bookings b " +
            "LEFT JOIN rooms r ON r.room_id = b.room " +
            "LEFT JOIN users u ON u.id = b.person " +
            "WHERE b.isdeleted=false", [])

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

// Insert booking
router.post('/', function(req, res){
    var data = req.body;
    if(data && data.description !== '') {

        db.one("INSERT INTO bookings (room, person, from_date, to_date, description, participants) " +
                "VALUES ($1, $2, $3, $4, $5, $6) " +
                "RETURNING *", [data.room, data.person, data.from_date, data.to_date, data.description, data.participants])
            .then(function (data) {
                if(_.isString(data)){
                    res.status(500).send(data);
                }
                else {
                    res.status(200).send({data: data});
                }
                // success;
            })
            .catch(function (error) {
                res.status(500).send(error.message);
                // error;
            });

    }
    else{
        res.status(500).send("Description is empty");
    }

});

// Update booking
router.put('/', function(req, res){
    var data = req.body;

    if(data && data.id !== undefined) {

        db.none("UPDATE bookings " +
                "SET room=$1, person=$2, from_date=$3, to_date=$4, description=$5, participants=$6 WHERE id=$7", [data.room, data.person, data.from_date, data.to_date, data.description, data.participants, data.id])
            .then(function (data) {
                // console.log(data);
                res.sendStatus(200);
                // success;
            })
            .catch(function (error) {
                // console.log(error);
                res.status(500).send(error.message);
                // error;
            });

    }
    else{
        res.status(500).send("No ID provided");
    }

});

// Delete booking
router.delete('/', function(req, res){
    var data = req.body;

    if(data && data.id !== undefined) {

        db.none("UPDATE bookings " +
                "SET isdeleted=true WHERE id=$1", [data.id])
            .then(function (data) {
                // console.log(data);
                res.sendStatus(200);
                // success;
            })
            .catch(function (error) {
                // console.log(error);
                res.status(500).send(error.message);
                // error;
            });

    }
    else{
        res.status(500).send("No ID provided");
    }

});

module.exports = router;

