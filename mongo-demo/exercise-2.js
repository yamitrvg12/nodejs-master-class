const mongooes = require('mongoose');

// Connect to the database
mongooes.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.log(`Couln't connect to MongoDB ${err.message}`));

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

// Models
const CourseExercise2 = mongooes.model('Course', schemaCourses);

async function getCourses() {
	const courses = await CourseExercise2
		.find({ isPublished: true })
		.or([{ tags: 'backend' }, { tags: 'frontend' }])
		.sort({ price: -1 })
		.select({ name: 1, author: 1 });

	return courses;
}

async function run() {
	const displayCourses = await getCourses();
	console.log(displayCourses);
}

run();
