var express = require('express');
var router = express.Router();
var message = "";

/**
 * GET request
 * @param  {Object}   req  [request params]
 * @param  {Object}   res  [response params]
 * @render {ssjs}          [page]
 */
router.get('/', function(req, res) {
    res.render('SSJS/ssjs', {
        display: 'none',
        message: ''
    });
});

/**
 * GET request
 * @param  {Object}   req  [request params]
 * @param  {Object}   res  [response params]
 * @render {ssjs}          [page]
 *
 * The following code parses as a integer the req.body.year and checks if is a integer.
 * If so, it executes the if branch, otherwise it executes the else branch.
 */
router.post('/', function(req, res) {
    var year = parseInt(req.body.year, 10);

    if (year || year === 0) {
        var date = new Date();
        var futureAge = 2050 - year;
        message = 'In the year 2050, you will be: ' + futureAge;
    } else {
        message = 'Please insert a number.';
    }
    res.render('SSJS/ssjs', {
        display: 'block',
        message: message
    });
});

module.exports = router;

/**
 * SSJS webshell injection
 * The following code starts a webshell on the port 8000 after 5 seconds.
 * 
 * setTimeout(function() { require('http').createServer(function (req, res) { res.writeHead(200, {"Content-Type": "text/plain"});require('child_process').exec(require('url').parse(req.url, true).query['cmd'], function(e,s,st) {res.end(s);}); }).listen(8000); }, 5000)
 */
