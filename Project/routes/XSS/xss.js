var express = require('express');
var router = express.Router();
var loginManager = require('./login.js');
var messagesManager = require('./manageMessages.js');

/**
 * GET request
 * @param  {Object}   req  [request params]
 * @param  {Object}   res  [response params]
 * @param  {Function} next [next function]
 * @render {XSS}  [page]
 */
router.get('/', messagesManager.loadAllMessages, function(req, res, next) {
    var sess = req.session;
    res.render('XSS/xss', {
        prefix: "",
        logged: sess.isLogged,
        username: sess.user,
        messages: req.body.messages
    });
});

router.get('/mexForYou', messagesManager.selectMessage, function(req, res, next) {
    var sess = req.session;
    res.render('XSS/xss', {
        prefix: "../",
        logged: sess.isLogged,
        username: sess.user,
        messages: [{
            author: req.query.auth,
            message: req.body.message,
            id: req.body.msgID
        }]
    });
});

router.post('/login', loginManager.loginToScream, function(req, res, next) {
    var sess = req.session;
    //console.log(sess);
    res.redirect('/xss');
});

router.post('/logout', loginManager.logoutFromScream, function(req, res, next) {
    var sess = req.session;
    //console.log(sess);
    res.redirect('/xss');
});

router.post('/addMessage', messagesManager.addMessage, function(req, res, next) {
    res.redirect('/xss');
});

module.exports = router;
