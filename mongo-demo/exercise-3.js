const mongooes = require('mongoose');

// Connect to the database
mongooes.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
	.then(() => console.log('Connected to mongoDB...'))
	.catch(err => console.log(`Couldn't connect to mongoDB ${err.message}`));

// Define the shape of documents.
const schemaCourses = mongooes.Schema({
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

// Models, give us a class
const CourseExercise3 = mongooes.model('Course', schemaCourses);

async function getCourses() {
	const courses = await CourseExercise3
		.find({ isPublished: true })
		.or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
		.sort({ price: 1 })
		.select({ name: 1, price: 1 });

	return courses;
}

async function run() {
	const displayCourses = await getCourses();
	console.log(displayCourses);
}

run();
