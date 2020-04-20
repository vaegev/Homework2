var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routes = require('./routes/index');
// var usersRouter = require('./routes/users/post-users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes.map(value => app.use(value.route, require(value.path)));

app.use((err, req, res, next) => {
    if (err) {
        res.status(400).send(err.stack);
    }
});

module.exports = app;
