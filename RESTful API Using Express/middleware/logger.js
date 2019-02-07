const debug = require('debug')('app:startup');

// req: request
// res: response
// next: reference to the next middleware function in the pipeline
function log(req, res, next) {
	debug('Logging...');
	next(); // next middleware
}

function authenticating(req, res, next) {
	debug('Authenticating...');
	next(); // next middleware
}

module.exports.log = log;
module.exports.aut = authenticating;
