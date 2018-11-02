const express = require("express");
const bodyParser = require("body-parser");
const { graphql, buildSchema } = require('graphql');
const routes = require("../controllers/index.js")
// import {
//   graphql,
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLString
// } from 'graphql';
// import { appendFile } from "fs";


const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
// app.use("/", routes);
// Routes
app.use(require('../controllers'));



app.get('/', function (req, res) {
    res.send('Hello Dev!');
});

app.listen(PORT, () => console.log("App is listening on port: " + PORT));

