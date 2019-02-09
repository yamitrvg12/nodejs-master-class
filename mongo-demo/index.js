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
		name: 'Angular Course',
		author: 'Rolando Villamil',
		tags: ['angular', 'frontend'],
		isPublished: true,
	});

	// save is an Asynchronous Operation, this save() return a Promises
	const result = await course.save();
	debug(result);
}

// createCourse();

async function getCourses() {
	// find() return DocumentQuery object, like a promises
	// inside find with object we can filter
	const courses = await Course
		.find({ author: 'Yamit Villamil' })
		.limit(1)
		.sort({ tags: -1 })
		.select({ name: 1, tags: 1 });
	debug(courses);
}

getCourses();
