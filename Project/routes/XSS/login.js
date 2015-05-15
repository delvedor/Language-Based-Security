var mysql = require('mysql');
var dbConf = require('../../dbConf');

var loginToScream = function(req, res, next) {
    var user = req.body.username;
    var password = req.body.password;
    var session = req.session
    var connection = mysql.createConnection({
        host: dbConf.dbHost,
        user: dbConf.dbUser,
        password: dbConf.dbPsw,
        port: dbConf.dbPort,
        database: dbConf.dbName
    });

    connection.connect();

    var sql = "SELECT * FROM Users WHERE User = " + connection.escape(user) + " AND Password = " + connection.escape(password) + "; ";

    connection.query(sql, function(err, rows, fields) {

        if (err)
            console.error(err);

        if (rows.length) {
            req.session.user = rows[0].User;
            req.session.isLogged = true;
        }

        next();
    });

    connection.end();
};

var logoutFromScream = function(req, res, next) {
    if (req.session.isLogged) {
        req.session.isLogged = false;
        req.session.user = "";
    }
    next();
};

module.exports.loginToScream = loginToScream;
module.exports.logoutFromScream = logoutFromScream;
