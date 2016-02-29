var mongoose = require('mongoose');
var reqlog = require('reqlog');
var Promise = require('es6-promise').Promise;

exports.connect = function(mongoUrl) {
	return new Promise(function(resolve, reject) {
		console.log(mongoUrl);
		// initializes the database connection
		mongoose.connect(mongoUrl);
		var database = mongoose.connection;
		database.on('error', function(error) {
			reqlog.error('database failed to connect', error);
			reject(error);
		});
		database.once('open', function() {
			reqlog.info('database connected');
			resolve();
		});
	});
};
