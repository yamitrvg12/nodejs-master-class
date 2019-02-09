const debug = require('debug')('app:mongodb');
const mongoose = require('mongoose');

// Connection string, name of the database
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
	.then(() => debug('Connected To MongoDB...'))
	.catch(err => debug(`Could not connect to MongoDB: ${err.message}`));

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: {
		type: Date,
		default: Date.now,
	},
	isPublished: Boolean,
});
