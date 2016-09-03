var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var auth = require('./server/auth/auth.controller');
var view = require('./server/view/view.controller');
var user = require('./server/user/user.controller');

mongoose.connect('mongodb://localhost:27017/street-view');

app.use(bodyParser.json());
app.use(express.static(__dirname + "/www"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

// Authentication
app.post('/api/user/signup', auth.signup);
app.post('/api/user/login', auth.login);

// View
app.post('/api/view/post', view.postView);
app.get('/api/view/get', view.getViews);

// User
app.put('/api/user/put', user.addSetupInfo);

app.listen('3000', function() {
	console.log("Listening for local host 3000");
});