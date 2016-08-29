var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var authentication = require('./server/controllers/auth.service');

mongoose.connect('mongodb://localhost:27017/street-view');

app.use(bodyParser.json());
app.use(express.static(__dirname + "/www"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

// Authentication
app.post('/api/user/signup', authentication.signup);

app.listen('3000', function() {
	console.log("Listening for local host 3000");
});