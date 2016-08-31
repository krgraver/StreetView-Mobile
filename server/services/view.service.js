var mongoose = require('mongoose');
var View = require('../datasets/views');

// Handle request for adding view

module.exports.postView = function(req, res) {
	var view = new View(req.body);
	view.save();
}

// Handle request to show all views

module.exports.getViews = function(req, res) {
	View.find({}, function(err, allViews) {
		if (err) {
			console.error(err);
		} else {
			res.json(allViews);
		}
	});
}