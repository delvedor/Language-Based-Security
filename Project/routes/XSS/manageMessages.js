var mysql = require('mysql');
var dbConf = require('../../dbConf');

var loadAllMessages = function(req, res, next) {
    var connection = mysql.createConnection({
        host: dbConf.dbHost,
        user: dbConf.dbUser,
        password: dbConf.dbPsw,
        port: dbConf.dbPort,
        database: dbConf.dbName
    });

    connection.connect();

    var sql = "SELECT * FROM Messages ORDER BY id DESC; ";

    connection.query(sql, function(err, rows, fields) {

        if (err)
            console.error(err);

        if (rows.length) {
            console.log(rows);
            req.body.messages = rows;
        } else {
            req.body.messages = [];
        }

        next();
    });

    connection.end();
};

var selectMessage = function(req, res, next) {
    var connection = mysql.createConnection({
        host: dbConf.dbHost,
        user: dbConf.dbUser,
        password: dbConf.dbPsw,
        port: dbConf.dbPort,
        database: dbConf.dbName
    });

    connection.connect();
    var msgID = req.query.msgID;
    var sql = "SELECT * FROM Messages WHERE id=" + connection.escape(msgID) + "; ";

    connection.query(sql, function(err, rows, fields) {

        if (err)
            console.error(err);
        if (rows.length) {
            console.log(rows);
            req.body.message = rows[0].message;
        } else {
            req.body.message = "";
            req.body.msgID = -1;
        }

        next();
    });

    connection.end();
};

var addMessage = function(req, res, next) {
    var connection = mysql.createConnection({
        host: dbConf.dbHost,
        user: dbConf.dbUser,
        password: dbConf.dbPsw,
        port: dbConf.dbPort,
        database: dbConf.dbName
    });

    connection.connect();
    var author = req.session.user;
    if (author === undefined)
        author = "Anonymous";
    var sql = "INSERT INTO Messages ( author, message) VALUES (" + connection.escape(author) + " , " + connection.escape(req.body.message) + "); ";

    connection.query(sql, function(err, rows, fields) {

        if (err)
            console.error(err);

        next();
    });

    connection.end();
};

module.exports.loadAllMessages = loadAllMessages;
module.exports.addMessage = addMessage;
module.exports.selectMessage = selectMessage;
