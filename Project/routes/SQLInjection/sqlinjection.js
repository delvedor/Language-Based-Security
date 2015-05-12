var express = require('express');
var db = require("./db");
var router = express.Router();
var checkSQL = false;
var user = "";

/**
 * GET request
 * @param  {Object}   req  [request params]
 * @param  {Object}   res  [response params]
 * @render {sqlinjection}  [page]
 */
router.get('/', function(req, res) {
    res.render('SQLInjection/sqlinjection', {
        display: 'none',
        message: ''
    });
});

/**
 * POST request
 * @param  {Object}   req  [request params]
 * @param  {Object}   res  [response params]
 * @render {sqlinjection}  [page]
 *
 * Before render the page, this function calls the function queryToDb.
 */
router.post('/', queryToDb, function(req, res) {
    if (checkSQL) {
        res.render('SQLInjection/sqlinjection', {
            display: 'block',
            message: 'Welcome, ' + user + '!'
        });
    } else {
        res.render('SQLInjection/sqlinjection', {
            display: 'block',
            message: 'User not found!'
        });
    }
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
