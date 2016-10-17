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
        "u.id, " +
        "u.name, " +
        "r.name as role_name, " +
        "p.name as position_name, " +
        "u.email " +
        "FROM users u " +
        "JOIN roles r on u.role = r.id " +
        "JOIN positions p on u.position = p.id " +
        "WHERE isdeleted=false " +
        "ORDER BY name ASC", [])
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

// Insert user
router.post('/', function(req, res){
    var data = req.body;

    if(data && data.username !== '' && data.password !== '') {

        db.one("INSERT INTO users (username, password, role, name, position, email) " +
                "VALUES ($1, $2, $3, $4, $5, $6) " +
                "RETURNING id", [data.username, data.password, data.role, data.name, data.position, data.email])
            .then(function (data) {
                // console.log(data);
                if(_.isString(data)){
                    res.status(500).send(data);
                }
                else {
                    res.status(200).send({id: data.id});
                }
                // success;
            })
            .catch(function (error) {
                // console.log(error);
                res.status(500).send(error.message);
                // error;
            });

    }
    else{
        res.status(500).send("Username or password is empty");
    }

});

// Update user
router.put('/', function(req, res){
    var data = req.body;

    if(data && data.id !== undefined && data.username !== '' && data.password !== '') {

        db.none("UPDATE users " +
                "SET username=$1, password=$2, role=$3, name=$4, position=$5, email=$6 WHERE id=$7", [data.username, data.password, data.role, data.name, data.position, data.email, data.id])
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

// Delete user
router.delete('/', function(req, res){
    var data = req.body;

    if(data && data.id !== undefined) {

        db.none("UPDATE users " +
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
