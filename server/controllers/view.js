var mongoose = require('mongoose');
var View = require('../models/views');

// Handle request for adding view

module.exports.postView = function(req, res) {
	var view = new View(req.body);
	view.save();
}

// Handle request to show all views

module.exports.getViews = function(req, res) {
	View.find({})
		.sort({date: -1})
		.exec( function(err, allViews) {
		if (err) {
			console.error(err);
		} else {
			res.json(allViews);
		}
	});
}
