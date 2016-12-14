var pgp = require('pg-promise')();
var dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'hearthstone',
  user: 'postgres',
  password: 'postgres'
};
var db = pgp(dbConfig);
var chance = require('chance').Chance();
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
  var data = req.body;
  if (data.email !== '' && data.password !== '') {
    db.one("select u.username, u.email from users u where email=$1 AND password=$2", [data.email, data.password])
      .then(function (data) {
        res.status(200).send({username: data.username, email: data.email, token: chance.hash()});
      })
      .catch(function () {
        res.status(500).send("Bad email or password");
      });
  }
  else {
    res.status(404).send("No email and password");
  }
});

module.exports = router;

