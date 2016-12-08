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
  db.any("SELECT m.id, c.name as firstClass, c.img as firstClassImg, p.name as secondClass ,p.img as secondClassImg, m.win FROM matches m JOIN classes c on m.fclass = c.id JOIN classes p on m.sclass = p.id ", [])
  // db.any("SELECT * FROM matches", []) , c.name as secondClass

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

router.get('/winrate', function (req, res) {
  var data = req.query;
  // var data = req.body;
  // var data = {'fclass': 21, 'sclass': 22};
  console.log(req);
  // db.any("SELECT m.id, c.name as firstClass, c.img as firstClassImg, p.name as secondClass ,p.img as secondClassImg, m.win FROM matches m JOIN classes c on m.fclass = c.id JOIN classes p on m.sclass = p.id ", [])
  // db.any("RETURNING ((SELECT COUNT(id) from matches WHERE fclass=1 , win=true)/(SELECT COUNT(id) from matches WHERE sclass=2))", [])
  db.any("SELECT (SELECT COUNT(id) from matches WHERE fclass=$1 and win=true) as w, " +
    "(SELECT COUNT(id) from matches WHERE sclass=$1 and win=false) as ww," +
    "(SELECT COUNT(id) from matches WHERE sclass=$2 and fclass=$1) as l, " +
    "(SELECT COUNT(id) from matches WHERE sclass=$1 and fclass=$2) as ll ", [data.fclass, data.sclass])
  // db.any("SELECT * FROM matches", []) , c.name as secondClass

    .then(function (data) {
      var proc = (Number(data[0].w)+Number(data[0].ww)) / (Number(data[0].l)+Number(data[0].ll))*100;
      console.log(data, proc);
      res.status(200).send({data: proc});

      // res.status(200).send(data[0].w);
      // success;
    })
    .catch(function (error) {
      // console.log(error);
      res.status(500).send(error.message);
      // error;
    });
});

// // Insert match
router.post('/new', function (req, res) {
  var data = req.body;
console.log(data);
  // if (data.name !== '' && data.img !== '') {

  db.one("INSERT INTO matches (fclass, sclass, win, fdeck, sdeck,date) " +
    "VALUES ($1, $2, $3, $4, $5, $6) " +
    "RETURNING *", [data.fclass, data.sclass, data.win,data.fdeck,data.sdeck, new Date()])
    .then(function (data) {
      res.status(200).send("ok");
      // success;
    })
    .catch(function (error) {
      // console.log(error);
      res.status(500).send(error.message);
      // error;
    });
  // }
  // else {
  //   res.status(500).send("Class name or img field is empty");
  // }
});

// db.any("SELECT " +
//   "u.id, " +
//   "u.name, " +
//   "r.name as role_name, " +
//   "p.name as position_name, " +
//   "u.email " +
//   "FROM users u " +
//   "JOIN roles r on u.role = r.id " +
//   "JOIN positions p on u.position = p.id " +
//   "WHERE isdeleted=false " +
//   "ORDER BY name ASC", [])

//
// // Insert user
// router.post('/', function(req, res){
//   var data = req.body;
//
//   if(data && data.username !== '' && data.password !== '') {
//
//     db.one("INSERT INTO users (username, password, role, name, position, email) " +
//       "VALUES ($1, $2, $3, $4, $5, $6) " +
//       "RETURNING id", [data.username, data.password, data.role, data.name, data.position, data.email])
//       .then(function (data) {
//         // console.log(data);
//         if(_.isString(data)){
//           res.status(500).send(data);
//         }
//         else {
//           res.status(200).send({id: data.id});
//         }
//         // success;
//       })
//       .catch(function (error) {
//         // console.log(error);
//         res.status(500).send(error.message);
//         // error;
//       });
//
//   }
//   else{
//     res.status(500).send("Username or password is empty");
//   }
//
// });
//
// // Update user
// router.put('/', function(req, res){
//   var data = req.body;
//
//   if(data && data.id !== undefined && data.username !== '' && data.password !== '') {
//
//     db.none("UPDATE users " +
//       "SET username=$1, password=$2, role=$3, name=$4, position=$5, email=$6 WHERE id=$7", [data.username, data.password, data.role, data.name, data.position, data.email, data.id])
//       .then(function (data) {
//         // console.log(data);
//         res.sendStatus(200);
//         // success;
//       })
//       .catch(function (error) {
//         // console.log(error);
//         res.status(500).send(error.message);
//         // error;
//       });
//
//   }
//   else{
//     res.status(500).send("No ID provided");
//   }
//
// });
//
// // Delete user
// router.delete('/', function(req, res){
//   var data = req.body;
//
//   if(data && data.id !== undefined) {
//
//     db.none("UPDATE users " +
//       "SET isdeleted=true WHERE id=$1", [data.id])
//       .then(function (data) {
//         // console.log(data);
//         res.sendStatus(200);
//         // success;
//       })
//       .catch(function (error) {
//         // console.log(error);
//         res.status(500).send(error.message);
//         // error;
//       });
//
//   }
//   else{
//     res.status(500).send("No ID provided");
//   }
//
// });

module.exports = router;
