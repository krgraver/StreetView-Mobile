var mongoose = require('mongoose');
var View = require('../datasets/views');

module.exports.postView = function(req, res) {
	var view = new View(req.body);
	view.save();
}

module.exports.getViews = function(req, res) {
	View.find({}, function(err, allViews) {
		if (err) {
			console.error(err);
		} else {
			res.json(allViews);
		}
	});
}