var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var logRouter = require('./routes/log');
var indexRouter = require('./routes/index');
var configRouter = require('./routes/config');
const url = require('./config').mongoConnectionString;
const database = 'log';
const mongoose = require('mongoose');

var app = express();
mongoose.connect(`${url + '/' + database}`);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '123456catr',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}))
app.use(flash());

app.use('/', indexRouter);
app.use('/log', logRouter);
app.use('/config', configRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(function(req, res, next){
  res.locals.success_messages = req.flash('success_messages');
  res.locals.error_messages = req.flash('error_messages');
  next();
});

// port must be set to 3000 because incoming http requests are routed from port 80 to port 8080
app.listen(5000, function () {
  console.log('Node app is running on port 5000');
});

module.exports = app;