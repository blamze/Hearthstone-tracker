var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var login = require('./routes/login');


var classes = require('./routes/classes');
var decks = require('./routes/decks');
var matches = require('./routes/matches');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/users', users);
app.use('/api/login', login);

app.use('/api/classes', classes);
app.use('/api/matches', matches);
app.use('/api/decks', decks);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.set('trust proxy',true);

app.use('/',express.static(path.join(__dirname, '..', 'client'),{ redirect: false }));


app.route('/*')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client','index.html'));
  });


module.exports = app;
