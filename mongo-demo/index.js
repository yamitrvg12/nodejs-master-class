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

// Models
// Compile that schema into a model, which gives us a class
const Course = mongoose.model('Course', courseSchema); // return a class

async function createCourse() {
	// create an object, instance of Course
	const course = new Course({
		name: 'React Course',
		author: 'Yamit Villamil',
		tags: ['react', 'frontend'],
		isPublished: true,
	});

	// save is an Asynchronous Operation, this save() return a Promises
	const result = await course.save();
	debug(result);
}

createCourse();
