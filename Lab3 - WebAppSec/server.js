var http = require('http');
var url = require('url');
http.createServer(function(req, res) {

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query); // Prints the cookie PHPSESSID value.

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end();

}).listen(80, 'ipaddr');
console.log('Server running at http://ipaddr/');
