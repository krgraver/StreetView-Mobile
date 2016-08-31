var mongoose = require('mongoose');
var User = require('../datasets/users');

// Handle request to add new User

module.exports.signup = function(req, res) {
	var user = new User(req.body);
	
	user.save();

	res.json(user);
}

// Handle request to log in existing User

module.exports.login = function(req, res) {
	User.find(req.body, function(err, results) {
		if (err) {
			console.error(err);
		} else if (results && results.length === 1) {
			var userData = results[0];
			res.json(userData);
		}
	});
}