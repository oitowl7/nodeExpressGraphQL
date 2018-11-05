const express = require("express");
const GraphHTTP = require("express-graphql");
const bodyParser = require("body-parser");
const https = require('https');
const fs = require('fs');
const path = require("path");
const Schema = require("./schema.js");

//config
const APP_PORT = 5000;

// Initialize Express
const app = express();
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//user router
const router = express.Router();

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
app.use(express.static("client/build"));

//test enpoint to make sure front and back ends are talking
app.get('/test', (req, res) => {
  res.send("This got hit");
})

//graphql endpoint
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "client/build/index.html")));

//server listener
app.listen(APP_PORT, ()=>{
  console.log("App listening on port " + APP_PORT);
})