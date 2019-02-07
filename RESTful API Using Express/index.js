const debug = require('debug')('app:startup');
const express = require('express');
const morgan = require('morgan');
const config = require('config');
const logger = require('./middleware/logger');

const app = express();
const port = process.env.PORT || 3000;

const home = require('./routes/home');
const courses = require('./routes/courses');

// Return view engine (html markup to the client)
app.set('view engine', 'pug');
app.set('views', './views');

// console.log(`NODE ENV:: ${process.env.NODE_ENV}`);
// console.log(`app:: ${app.get('env')}`);

// Built-in middleware
app.use(express.json()); // middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Third Party middleware
if (app.get('env') === 'development') {
	app.use(morgan('tiny'));
	debug('Morgan is enabled...'); // console.log('Morgin enabled...');
}

// Custom middleware
app.use(logger.log);
app.use(logger.aut);

if (config.has('mail')) {
	debug(`Application Name:: ${config.get('name')}`);
	debug(`Mail Server:: ${config.get('mail.host')}`);

	if (config.has('mail.password')) {
		debug(`Password:: ${config.get('mail.password')}`);
	}
}

app.use('/', home);
app.use('/api/courses', courses);

app
	.listen(port, () => debug(`Listening on port ${port}...`))
	.on('error', (error) => {
		debug(error);
		// List the services running in the console: lsof -iTCP -sTCP:LISTEN -P
		// Kill services running: sudo killall -9 node
	});
