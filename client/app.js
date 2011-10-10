var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var qs = require('querystring');

server = http.createServer(function(req, res) {
        var pathname = url.parse(req.url).pathname;
        
        
        var fullpath = path.join(process.cwd(), pathname);
 
path.exists(fullpath, function(exists) {
    
    if (!exists) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("<h1>Page not found</h1>");
        return;
    }
    

 
    fs.readFile(fullpath, "binary", function(err, data) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end("<h1>Page cannot be read</h1>");
            return;
        }
 
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(data, "binary");
        res.end();
    });
});

});

server.listen(process.env.VMC_APP_PORT || 8001);