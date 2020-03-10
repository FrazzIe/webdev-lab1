var express = require("express");
var app = express();
var mustache = require("mustache-express");
var path = require("path");

app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", path.resolve(__dirname, "mustache"));

var DAO = require('./model/nedb');
var dao = new DAO('database.nedb.db');

dao.init();

app.get("/", function(req, res) {
    res.status(200);
    res.type(".html");
    res.send("<h1>/</h1>")
});

app.get("/guest", function(req, res) {
    dao.all().then((list) => {
        res.status(200);
        res.render("guestbook", {
            "entries": list
        });
    }).catch((err) => {
        res.status(500);
        res.type(".html");
        res.send("<h1>Error:</h1> <br><p>" + JSON.stringify(err) + "</p>");
        console.log('Error: ');
        console.log(JSON.stringify(err));
    });   
});

app.listen(3000)