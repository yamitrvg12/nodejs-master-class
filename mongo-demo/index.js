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
	price: Number,
	isPublished: Boolean,
});

// Models
// Compile that schema into a model, which gives us a class
const Course = mongoose.model('Course', courseSchema); // return a class

async function createCourse() {
	// create an object, instance of Course
	const course = new Course({
		name: 'Vue',
		author: 'Voz Pablo',
		tags: ['frontend'],
		price: 19,
		isPublished: false,
	});

	// save is an Asynchronous Operation, this save() return a Promises
	const result = await course.save();
	debug(result);
}

// createCourse();

async function getCourses() {
	// Query operators
	/*
		$eq: equal
		$ne: not equal
		$gt: greater than
		$gte: greater than or equal
		$lt: less than
		$lte: less than or equal to
		$in: Array to validate exact values
		$nin: not in
	*/

	// Logical operators (methods)
	/*
		.or()
		.and()
	*/

	const courses = await Course
		.find({ author: /villamil$/i })
		.count();

	debug(courses);
}

// getCourses();

async function updateCourse(id) {
	const course = await Course.findById(id);

	if (!course) return;

	course.set({
		isPublished: false,
		author: 'Nooooooooo.',
	});

	const result = await course.save();

	debug(result);
}


updateCourse('5c5ef1cbf7e03ad4628921e8');
