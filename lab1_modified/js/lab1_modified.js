var http = require('http'); //import http lib
var fs = require('fs'); //import filesystem lib
const path = require('path'); //import path lib

function serveStatic(res, fileName, contentType, responseCode) {
    if (!responseCode) responseCode = 200;

    var filePath = path.join(__dirname, "..", "html", fileName);

    fs.readFile(filePath, function(err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain'});
            res.end("500 - Internal Error");
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);           
        }
    })
}

http.createServer(function(req,res){
    // the replace function removes any query strings and slashes
    // the toLowerCase functions makes it lower case 
    let reqPath = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase(); //regex to remove vars from path
    switch(reqPath) {
        case '':
            serveStatic(res, "home.html", "text/html", 200);
            break;
        case '/products':
            serveStatic(res, "products.html", "text/html", 200);
            break;
        default:
            serveStatic(res, "404.html", "text/html", 404);
            break;
        }
    }).listen(8000);
    
console.log('Server started on localhost:8000; press Ctrl-C to terminate....');
