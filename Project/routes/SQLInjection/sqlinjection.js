var express = require('express');
var db = require("./db");
var router = express.Router();
var checkSQL = false;
var user = "";
var ipsTimeout = {}; // object with all timeouts
var ipsError = {}; // object with all ips
var message = "";
var display = "";

/**
 * GET request
 * @param  {Object}   req  [request params]
 * @param  {Object}   res  [response params]
 * @render {sqlinjection}  [page]
 */
router.get('/', function(req, res) {
    if (ipsError[req.ip] && ipsError[req.ip] > 4) {
        message = 'You have made too many login attempts, wait 10 minutes before try again.';
        display = 'block';
    } else {
        message = '';
        display = 'none';
    }
    res.render('SQLInjection/sqlinjection', {
        display: display,
        message: message
    });
});

/**
 * POST request
 * @param  {Object}   req  [request params]
 * @param  {Object}   res  [response params]
 * @render {sqlinjection}  [page]
 *
 * Before render the page, this function calls the functions checkIp and queryToDb.
 */
router.post('/', checkIp, queryToDb, function(req, res) {
    if (checkSQL) {
        if (ipsError[req.ip])
            delete ipsError[req.ip];
        message = 'Welcome ' + user + '.';
        display = 'block';
    } else {
        if (ipsError[req.ip])
            ipsError[req.ip] = ipsError[req.ip] + 1;
        else
            ipsError[req.ip] = 1;
        message = 'User not found!';
        display = 'block';
    }
    res.render('SQLInjection/sqlinjection', {
        display: display,
        message: message
    });
});

/**
 * queryToDb
 * @param  {Object}   req  [request params]
 * @param  {Object}   res  [response params]
 * @param  {Function} next [next function]
 */
function queryToDb(req, res, next) {
    db.queryDB(req.body.user, req.body.password, next);
}

/**
 * checkIp
 * @param  {Object}   req  [request params]
 * @param  {Object}   res  [response params]
 * @param  {Function} next [next function]
 *
 * This function checks if exist a timeout for a given ip, 
 * if not, check if the given ip  have reached the max amount of errors, 
 * if so, it creates a timeout of 10 minutes, during the given ip cannot make query to the db.
 * If the given ip have not reached the max amount of errors, the function leaves continue the request.  
 */
function checkIp(req, res, next) {
    var ip = req.ip;

    if (ipsTimeout[ip]) {
        res.end();

    } else if (ipsError[ip] > 4) {
        ipsTimeout[ip] = setTimeout(function() {
            delete ipsError[ip];
            delete ipsTimeout[ip];
        }, 1000 * 60 * 10);
        res.end();

    } else {
        next();
    }
}

/**
 * setCheckSQL
 * @param {boolean} newCheckSQL [New value of checkSQL]
 */
var setCheckSQL = function(newCheckSQL) {
    checkSQL = newCheckSQL;
};

/**
 * setCheckSQL
 * @param {String} username [New value of user]
 */
var setUser = function(username) {
    user = username;
};

module.exports.setCheckSQL = setCheckSQL;
module.exports.setUser = setUser;
module.exports = router;
