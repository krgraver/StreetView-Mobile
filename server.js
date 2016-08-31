var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var authentication = require('./server/services/auth.service');
var view = require('./server/services/view.service');
var user = require('./server/services/user.service');

mongoose.connect('mongodb://localhost:27017/street-view');

app.use(bodyParser.json());
app.use(express.static(__dirname + "/www"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

// Authentication
app.post('/api/user/signup', authentication.signup);
app.post('/api/user/login', authentication.login);

// View
app.post('/api/view/post', view.postView);
app.get('/api/view/get', view.getViews);

// User
app.put('/api/user/put', user.addSetupInfo);

app.listen('3000', function() {
	console.log("Listening for local host 3000");
});