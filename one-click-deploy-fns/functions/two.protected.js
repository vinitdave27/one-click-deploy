exports.handler = function (context, event, callback) {
	callback(null, { message: 'Hello Protected!!!' });
};
