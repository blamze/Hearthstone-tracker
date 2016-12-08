var _ = require('lodash');
var pgp = require('pg-promise')();
var dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'hearthstone',
  user: 'postgres',
  password: 'postgres'
};
var db = pgp(dbConfig);
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  db.any("SELECT " +
    "u.id, " +
    "u.username, " +
    "u.email " +
    "FROM users u " +
    "WHERE isdeleted=false " +
    "ORDER BY id ASC", [])
    .then(function (data) {
      res.status(200).send({data: data});
      // success;
    })
    .catch(function (error) {
      res.status(500).send(error.message);
      // error;
    });
});

// Insert user
router.post('/', function (req, res) {
  var data = req.body;

  if (data.username !== '' && data.password !== '' && data.email !== '') {

    db.one("INSERT INTO users (username, password, email) " +
      "VALUES ($1, $2, $3) " +
      "RETURNING id", [data.username, data.password, data.email])
      .then(function (data) {
        res.status(200).send({id: data.id});
        // success;
      })
      .catch(function (error) {
        res.status(500).send(error.message);
        // error;
      });
  }
  else {
    res.status(500).send("Username, email or password is empty");
  }

});


// Delete user
router.delete('/', function (req, res) {
  var data = req.body;
  if (data && data.id !== undefined) {
    db.none("UPDATE users " +
      "SET isdeleted=true WHERE id=$1", [data.id])
      .then(function (data) {
        res.sendStatus(200);
        // success;
      })
      .catch(function (error) {
        res.status(500).send(error.message);
        // error;
      });
  }
  else {
    res.status(500).send("No ID provided");
  }

});

module.exports = router;
