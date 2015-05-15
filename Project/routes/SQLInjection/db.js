var mysql = require('mysql');
var dbConf = require('../../dbConf');
var sq = require("./sqlinjection");

/**
 * queryDb - vulnerable function        
 * @param  {String}   user     [username of the user]
 * @param  {String}   password [password of the user]
 * @param  {Function} next     [next function]
 * @return {Function}          [next function]
 *
 * This function is vulnerable because don't perform any escape on the user and password variables.
 */
var queryDB = function(user, password, next) {
    var connection = mysql.createConnection({
        host: dbConf.dbHost,
        user: dbConf.dbUser,
        password: dbConf.dbPsw,
        port: dbConf.dbPort,
        database: dbConf.dbName
    });

    connection.connect();

    // SQL not vulnerable command
    var sql = "SELECT * FROM Users WHERE User = " + connection.escape(user) + " AND Password = " + connection.escape(password) + "; ";

    connection.query(sql, function(err, rows, fields) {
        sq.setCheckSQL(false);

        if (err)
            console.error(err);

        if (rows.length) {
            sq.setUser(rows[0].User);
            sq.setCheckSQL(true);
        }

        next();
    });

    connection.end();
};

module.exports.queryDB = queryDB;
