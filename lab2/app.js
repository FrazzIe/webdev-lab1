const express = require("express");
const app = express();
const handlebars = require("express-handlebars"); //Used for html layout templates in a SPA

app.set("port", process.env.PORT || 8000);
app.engine("handlebars", handlebars()); //Add handlebars engine to the app
app.set("view engine", "handlebars");

//Index page
app.get("/", function(req, res) {
    //res.type("text/plain");
    //res.send("Index");
    res.render("home");
});

//About page
app.get("/about", function(req, res) {
    //res.type("text/plain");
    //res.send("About");
    res.render("about");
});

//404 Page
app.use(function(req, res) {
    //res.type("text/plain");
    res.status(404);
    //res.send("404 - Not Found");
    res.render("5303");
});

//500 Page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    //res.type("text/plain");
    res.status(500);
    //res.send("500 - Internal Server Error");
    res.render("501");
});

app.listen(app.get("port"), function() {
    console.log("App started on http://localhost:" + app.get("port") + "; Press Ctrl-C to terminate.");
});

