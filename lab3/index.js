var express = require("express");
var app = express();
var mustache = require("mustache-express");
var path = require("path");

app.set("port", process.env.PORT || 3000);
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", path.resolve(__dirname, "mustache"));

app.get("/", function(req, res) {
    res.status(200);
    res.type("text/html");
    res.send("<h1>Landing page</h1>");
});

app.get("/page", function(req, res) {
    res.render("page", {
        "title": "Guest book",
        "entries": [
            {
                "subject": "sub 1",
                "review": "Review 1",
            },
            {
                "subject": "sub 2",
                "review": "Review 2",
            }
        ]
    });
});

app.use(function(req, res) {
    res.type("text/plain");
    res.status(404);
    res.send("404 not found");
});

app.listen(app.get("port"), function() {
    console.log("...");
});