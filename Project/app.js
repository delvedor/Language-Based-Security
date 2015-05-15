var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var helmet = require('helmet');

var routes = require('./routes/index');
var users = require('./routes/users');
var basm = require('./routes/BASM/basm');
var sqlinjection = require('./routes/SQLInjection/sqlinjection');
var xss = require('./routes/XSS/xss');
var ssjs = require('./routes/SSJS/ssjs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());

//Disable the x-powered-by field
//app.disable("x-powered-by");

//Pretend to be PHP in x-powered-by
app.use(helmet.hidePoweredBy({
    setTo: 'PHP 4.2.0'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 *   Setting the rolling parameter to true it will change the session-cookie value every time
 *   that the page is refreshed or that a new page is accessed.
 *   In that way we can prevent attacks like the session hijacking.
 *   In addition to that, setting httpOnly to true the session-cookie will be available only 
 *   through http request, so it si not accessible from the client javascript code.  
 */

app.use(session({
    name: "session",
    secret: 'biu4758bwog94oqnpehjrhp',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true, // make available the session-cookie only through http request
        secure: false // the session-cookie is not only accessible through https
    },
    rolling: true // for every request change the session cookie
}));

app.use('/', routes);
app.use('/users', users);
app.use('/basm', basm);
app.use('/sqlinjection', sqlinjection);
app.use('/xss', xss);
app.use('/ssjs', ssjs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
