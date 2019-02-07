const Joi = require('joi');
const express = require('express');
const router = express.Router(); // when we separate the routes in a different module, we need to use the Router

const courses = [
    { id: 1, name: 'course 1'},
    { id: 2, name: 'course 2'},
    { id: 3, name: 'course 3'}
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.filter(cr => cr.id === parseInt(req.params.id));

    if (course.length > 0) {
        res.send(course);
    } else {
        res.status(404).send('The course with the given ID was not found.');
    }
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        // 400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    // Look up the course
    const course = courses.filter(cr => cr.id === parseInt(req.params.id));

    if (course.length <= 0) {
        res.status(404).send('The course with the given ID was not found.');
        return;
    }

    // Validate
    const { error } = validateCourse(req.body);

    if (error) {
        // 400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update course
    course.map(cr => cr.name = req.body.name);

    // Return the update course
    res.send(course);
});

router.delete('/:id', (req, res) => {
    // Look up the course
    const course = courses.filter(cr => cr.id === parseInt(req.params.id));

    if (course.length <= 0) {
        res.status(404).send('The course with the given ID was not found.');
        return;
    }

    // Delete
    const index = courses.findIndex(cr => cr.id === parseInt(req.params.id));
    courses.splice(index, 1);

    // Return the update course
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

module.exports = router;