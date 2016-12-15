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

//Get all decks
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

//Insert deck
router.post('/new', function (req, res) {
  var data = req.body;
  if (data.name && data.url && data.classid) {
    db.one("INSERT INTO decktypes (name, url, classid) VALUES ($1, $2, $3) RETURNING *", [data.name, data.url, data.classid])
      .then(function () {
        res.status(200).send("deck added");
        // success;
      })
      .catch(function (error) {
        res.status(500).send(error.message);
        // error;
      });
  } else {
    res.status(500).send('No deck name, url or class id');
  }

});

//Update deck
router.put('/edit', function (req, res) {
  var data = req.body;
  if (data.name && data.url && data.classid && data.id) {
    db.none("UPDATE decktypes SET name=$1, url=$2, classid=$3 WHERE id=$4 and isdeleted=false", [data.name, data.url, data.classid, data.id])
      .then(function () {
        // success;
        res.status(200).send("deck updated");
      })
      .catch(function (error) {
        res.status(500).send(error.message);
        // error;
      });
  } else {
    res.status(500).send('No deck name, url or class id or deck id');
  }
});

//Delete deck
router.put('/delete', function (req, res) {
  var id = req.body.id;
  if (id !== undefined) {
    db.none("UPDATE decktypes " +
      "SET isdeleted=true WHERE id=$1", [id])
      .then(function () {
        res.status(200).send('deck deleted');
        // success;
      })
      .catch(function (error) {
        res.status(500).send(error.message);
        // error;
      });
  } else {
    res.status(500).send("No ID provided");
  }
});

module.exports = router;
