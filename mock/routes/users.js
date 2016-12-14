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
    "u.email, " +
    "u.addedmatches " +
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


router.get('/highscore', function (req, res) {
  db.any("SELECT " +
    "u.username, " +
    "u.addedMatches " +
    "FROM users u " +
    "WHERE isdeleted=false and addedmatches>0 " +
    "ORDER BY addedmatches DESC", [])
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
    db.one("SELECT NOT EXISTS ( SELECT 1 FROM users WHERE email=$1) as exist", [data.email]).then((exist) => {
      console.log(exist.exist);
      if (exist.exist === true) {
        db.one("INSERT INTO users (username, password, email) " +
          "VALUES ($1, $2, $3) " +
          "RETURNING id", [data.username, data.password, data.email])
          .then(function (data) {
            res.status(200).send({id: data.id});
            // success;
          })
          .catch(function () {
            res.status(500).send("Something went wrong");
            // error;
          });
      } else {
        res.status(500).send("User exist with that email");
      }

    })
  }
  else {
    res.status(500).send("Inser username, email and password");
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

// Update user points
router.put('/add', function (req, res) {
  var data = req.body;
  if(data.data) {
    db.none("UPDATE users SET addedmatches=addedmatches+1 WHERE email=$1 and isdeleted=false", [data.data])
      .then(function (data) {
        // success;
        res.status(200).send("ok");
      })
      .catch(function (error) {
        res.status(500).send(error.message);
        // error;
      });
  } else {
    res.status(500).send("No email provided");
  }

});

module.exports = router;
