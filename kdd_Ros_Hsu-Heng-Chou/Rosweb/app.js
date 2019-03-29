var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
app.use(logger('dev'));
var bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var dbURI = 'mongodb://localhost:27010/test';
// if (process.env.NODE_ENV === 'production') {
//   dbURI = process.env.MONGOLAB_URI;
// }

mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});
var Workstation = require('./model/Workstation')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var workstationRouter = require('./routes/workstation');
var robotRouter = require('./routes/robot');
var robotcontrolRouter = require('./routes/robotcontrol');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/workstation', workstationRouter);
app.use('/robot', robotRouter);
app.use('/robotcontrol', robotcontrolRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
