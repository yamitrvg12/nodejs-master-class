const Joi = require('joi');
const debug = require('debug')('app:startup');
const express = require('express');
const morgan = require('morgan');
const config = require('config');
const app = express();
const logger = require('./logger');
const port = process.env.PORT || 3000;

// Return view engine (html markup to the client)
app.set('view engine', 'pug');
app.set('views', './views');

// console.log(`NODE ENV:: ${process.env.NODE_ENV}`);
// console.log(`app:: ${app.get('env')}`);

// Built-in middleware
app.use(express.json()); // middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Third Party middleware
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan is enabled...'); // console.log('Morgin enabled...');
}

// Custom middleware
app.use(logger.log);
app.use(logger.aut);

if (config.has('mail')) {
    debug(`Application Name:: ${config.get('name')}`);
    debug(`Mail Server:: ${config.get('mail.host')}`);
    
    if (config.has('mail.password')) {
        debug(`Password:: ${config.get('mail.password')}`);
    }
}

const courses = [
    { id: 1, name: 'course 1'},
    { id: 2, name: 'course 2'},
    { id: 3, name: 'course 3'}
];

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Yamit Villamil',
        message: 'This is a simple example of loading a markup'
    }); // arguments: name of the view (index.pug), object that include all the values of the index.pug
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.filter(cr => cr.id === parseInt(req.params.id));

    if (course.length > 0) {
        res.send(course);
    } else {
        res.status(404).send('The course with the given ID was not found.');
    }
});

app.post('/api/courses', (req, res) => {
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

app.put('/api/courses/:id', (req, res) => {
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

app.delete('/api/courses/:id', (req, res) => {
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

app
    .listen(port, () => console.log(`Listening on port ${port}...`))
    .on('error', function(error) {
        debug(error);
        // List the services running in the console: lsof -iTCP -sTCP:LISTEN -P
        // Kill services running: sudo killall -9 node
    });