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
  db.any("SELECT * FROM classes", [])
    .then(function (data) {
      res.status(200).send({data: data});
      // success;
    })
    .catch(function (error) {
      res.status(500).send(error.message);
      // error;
    });
});

// // Insert class
router.post('/new', function (req, res) {
  var data = req.body;

  db.one("INSERT INTO classes (name, img) VALUES ($1, $2) RETURNING *", [data.name, data.img])
    .then(function (data) {
      res.status(200).send("ok");
      // success;
    })
    .catch(function (error) {
      res.status(500).send(error.message);
      // error;
    });
});

// // Update class
router.put('/edit', function (req, res) {
  var data = req.body;

  db.none("UPDATE classes SET name=$1, img=$2 WHERE id=$3", [data.name, data.img, data.id])
    .then(function (data) {
      // success;
      res.status(200).send("ok");
    })
    .catch(function (error) {
      // console.log(error);
      res.status(500).send(error.message);
      // error;
    });
});

// // Delete class
router.delete('/delete', function (req, res) {
    var data = req.body;

    db.none("DELETE FROM classes WHERE id=($1)", [data.id])
      .then(function (data) {
        res.status(200).send("ok");
        // success;
      })
      .catch(function (error) {
        // res.status(500).send(error.message);
        res.status(500).send(error.message);
        // error;
      });
  }

);

module.exports = router;
