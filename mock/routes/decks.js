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
//get all decks
router.get('/', function (req, res) {
  db.any("SELECT d.id, c.name as class, c.img as classimg, d.url, d.name FROM decktypes d JOIN classes c on d.classid = c.id WHERE d.isdeleted=false", [])
    .then(function (data) {
      res.status(200).send({data: data});
      // success;
    })
    .catch(function (error) {
      res.status(500).send(error.message);
      // error;
    });
});

// get deck by id
router.get('/:id', function (req, res) {
  var id = req.params.id
  db.any("SELECT d.id, c.name as class, c.img as classimg, d.url, d.name FROM decktypes d JOIN classes c on d.classid = c.id WHERE d.classid=$1 and d.isdeleted=false", [id])
    .then(function (data) {
      res.status(200).send({data: data});
      // success;
    })
    .catch(function (error) {
      res.status(500).send(error.message);
      // error;
    });
});

// // Insert deck
router.post('/new', function (req, res) {
  var data = req.body;

  db.one("INSERT INTO decktypes (name, url, classid) VALUES ($1, $2, $3) RETURNING *", [data.name, data.url, data.classid])
    .then(function (data) {
      res.status(200).send("ok");
      // success;
    })
    .catch(function (error) {
      res.status(500).send(error.message);
      // error;
    });
});

// // Update deck
router.put('/edit', function (req, res) {
  var data = req.body;

  db.none("UPDATE decktypes SET name=$1, url=$2, classid=$3 WHERE id=$4 and isdeleted=false", [data.name, data.url, data.classid, data.id])
    .then(function (data) {
      // success;
      res.status(200).send("ok");
    })
    .catch(function (error) {
      res.status(500).send(error.message);
      // error;
    });
});

// // Delete deck
router.put('/delete', function (req, res) {
  var id = req.body.id;
  if (id !== undefined) {
    db.none("UPDATE decktypes " +
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
