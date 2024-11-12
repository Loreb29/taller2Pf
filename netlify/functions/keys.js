var express = require('express');
var cors = require("cors");
var serverless = require ('serverless-http');
var app = express();
console.log("DOS")

var keysroutes = require("../../backend/routes/keysroutes.js");


app.use(express.json());
app.use(cors());

var router = express.Router();
router.use ("/keys",keysroutes);

var handler = app.use ('/.netlify/functions',router);
exports.handler = serverless (app);