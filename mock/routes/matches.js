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
  db.any("SELECT m.id, c.name as firstClass, c.img as firstClassImg, p.name as secondClass ,p.img as secondClassImg, m.win" +
    " FROM matches m JOIN classes c on m.fclass = c.id JOIN classes p on m.sclass = p.id ", [])
    .then(function (data) {
      res.status(200).send({data: data});
      // success;
    })
    .catch(function (error) {
      res.status(500).send(error.message);
      // error;
    });
});

router.get('/winrate', function (req, res) {
  var data = req.query;
  db.any("SELECT (SELECT COUNT(id) from matches WHERE fclass=$1 and win=true) as w, " +
    "(SELECT COUNT(id) from matches WHERE sclass=$1 and win=false) as ww," +
    "(SELECT COUNT(id) from matches WHERE sclass=$2 and fclass=$1) as l, " +
    "(SELECT COUNT(id) from matches WHERE sclass=$1 and fclass=$2) as ll ", [data.fclass, data.sclass])
    .then(function (data) {
      var proc = (Number(data[0].w)+Number(data[0].ww)) / (Number(data[0].l)+Number(data[0].ll))*100;

      res.status(200).send({data: proc});
      // success;
    })
    .catch(function (error) {
      res.status(500).send(error.message);
      // error;
    });
});

// // Insert match
router.post('/new', function (req, res) {
  var data = req.body;

  db.one("INSERT INTO matches (fclass, sclass, win, fdeck, sdeck,date) " +
    "VALUES ($1, $2, $3, $4, $5, $6) " +
    "RETURNING *", [data.fclass, data.sclass, data.win,data.fdeck,data.sdeck, new Date()])
    .then(function (data) {
      res.status(200).send("ok");
      // success;
    })
    .catch(function (error) {
      res.status(500).send(error.message);
      // error;
    });
});

module.exports = router;
