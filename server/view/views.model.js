var mongoose = require('mongoose');

module.exports = mongoose.model('View', {
	userId: String,
	userFirstName: String,
	userLastName: String,
	image: String,
	description: String,
	artType: String,
	date: {type: Date, default: Date.now}
});