var mongoose = require('mongoose');
var User = require('./users.model');

// Handle request to update user model after Account Setup

module.exports.addSetupInfo = function(req, res) {
	User.findById(req.body._id, function(err, response) {
		var user = response;

		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		user.save();

		res.json(user);
		
	});
}