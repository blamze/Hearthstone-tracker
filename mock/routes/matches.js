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
// Get all matches
router.get('/', function (req, res) {
  db.any("SELECT m.id, m.date, c.name as firstClass, c.img as firstClassImg, " +
    " p.name as secondClass ,p.img as secondClassImg, m.win , d.name as firstDeck, z.name as secondDeck" +
    " FROM matches m JOIN classes c on m.fclass = c.id JOIN classes p on m.sclass = p.id JOIN decktypes d on m.fdeck = d.id " +
    "JOIN decktypes z on m.sdeck = z.id ", [])
    .then(function (data) {
      res.status(200).send({data: data});
      // success;
    })
    .catch(function (error) {
      res.status(500).send(error.message);
      // error;
    });
});
//Get winrate
router.post('/winrate', function (req, res) {
  var data = req.body;
  if (data.fclass, data.sclass) {
    db.any("SELECT (SELECT COUNT(id) from matches WHERE fclass=$1 and sclass=$2 and win=true) as w, " +
      "(SELECT COUNT(id) from matches WHERE fclass=$2 and sclass=$1 and win=false) as ww," +
      "(SELECT COUNT(id) from matches WHERE sclass=$2 and fclass=$1) as total, " +
      "(SELECT COUNT(id) from matches WHERE sclass=$1 and fclass=$2) as total2 ", [data.fclass, data.sclass])
      .then(function (info) {
        var num1 = Number(info[0].w) > Number(info[0].ww) ? Number(info[0].w) : Number(info[0].ww);
        var num2 = Number(info[0].total) > Number(info[0].total2) ? Number(info[0].total) : Number(info[0].total2);
        var proc = (num1 / num2) * 100;
        res.status(200).send({data: proc});
        // success;
      })
      .catch(function (error) {
        res.status(500).send(error.message);
        // error;
      });
  } else {
    res.status(500).send('Lack 1 or 2 class id');
  }
});

//Insert match
router.post('/new', function (req, res) {
  var data = req.body;
  if (data.fclass && data.sclass && data.win && data.fdeck && data.sdeck) {
    db.one("INSERT INTO matches (fclass, sclass, win, fdeck, sdeck,date) " +
      "VALUES ($1, $2, $3, $4, $5, $6) " +
      "RETURNING *", [data.fclass, data.sclass, data.win, data.fdeck, data.sdeck, new Date()])
      .then(function () {
        res.status(200).send("match added");
        // success;
      })
      .catch(function (error) {
        res.status(500).send(error.message);
        // error;
      });
  } else {
    res.status(500).send('No classes id, deck names or who won');
  }
});

module.exports = router;
