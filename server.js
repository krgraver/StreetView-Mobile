var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('viewlist', ['viewlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());

app.get('/viewlist', function(req, res) {
	console.log("I received a GET request");

	db.viewlist.find(function(err, docs){
		res.json(docs);
	});
});

app.listen(8100);
console.log("Server running on port 8100");