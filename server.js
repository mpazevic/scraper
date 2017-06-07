'use strict'

//Dependencies
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const mongoose = require('mongoose');
const exphbs = require("express-handlebars");
const viewRouter = require("./routes/viewRouter.js");
const apiRouter = require("./routes/apiRouter.js");

const PORT = process.env.PORT || 8080;

//set up express
const app = express();
app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

//Set up handlebars appropriately
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Mongoose set-up
const localDbUrl = 'mongodb://localhost/scrapeDB'
//process.env.MONGOLAB_URI || localDbUrl --> connect with these if desired
mongoose.connect("mongodb://heroku_gz9s0fsn:658o11ge1hval9njdg70jo89tv@ds115712.mlab.com:15712/heroku_gz9s0fsn");
var db = mongoose.connection;

// Track any Mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Log a success message when we connect to our mongoDB collection with no issues
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//Use routes for API and view
app.use("/", viewRouter);
app.use("/api", apiRouter);

// Listen on specified port
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});
