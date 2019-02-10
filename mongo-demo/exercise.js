const mongoose = require('mongoose');

// Connect to the database, return a promises
mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.log(`Couldn't connect to MongoDB ${err.message}`));

// Define the shape of documents.
const schemaCourses = new mongoose.Schema({
	name: String,
	author: String,
	isPublished: Boolean,
	price: Number,
	date: {
		type: Date,
		default: Date.now,
	},
	tags: [String],
});

// Models
const CoursesExercise = mongoose.model('Course', schemaCourses); // Give us a Class

async function getCourses() {
	const courses = await CoursesExercise
		.find({ isPublished: true, tags: 'backend' })
		.sort({ name: 1 })
		.select({ name: 1, author: 1 });

	return courses;
}

async function run() {
	const displayCourses = await getCourses();
	console.log(displayCourses);
}

run();
