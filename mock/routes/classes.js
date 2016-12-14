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
  db.any("SELECT * FROM classes WHERE isdeleted=false", [])
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

  db.one("INSERT INTO classes (name, img, url) VALUES ($1, $2, $3) RETURNING *", [data.name, data.img, data.url])
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

  db.none("UPDATE classes SET name=$1, img=$2, url=$3 WHERE id=$4 and isdeleted=false", [data.name, data.img, data.url, data.id])
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
router.put('/delete', function (req, res) {
  var id = req.body.id;
  if (id !== undefined) {
    db.none("UPDATE classes " +
      "SET isdeleted=true WHERE id=$1", [id])
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
