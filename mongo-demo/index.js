const debug = require('debug')('app:mongodb');
const mongoose = require('mongoose');

// Connection string, name of the database
mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true })
	.then(() => debug('Connected To MongoDB...'))
	.catch(err => debug(`Could not connect to MongoDB: ${err.message}`));
