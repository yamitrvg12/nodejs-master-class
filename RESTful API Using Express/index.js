const Joi = require('joi');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // middleware

const courses = [
    { id: 1, name: 'course 1'},
    { id: 2, name: 'course 2'},
    { id: 3, name: 'course 3'}
];

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
    res.send([1,2,3,4]);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.filter(cr => cr.id === parseInt(req.params.id));

    if (course.length > 0) {
        res.send(course);
    } else {
        res.status(404).send('Not found');
    }
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if (result.error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));