const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
    res.send([1,2,3,4]);
});

app.get('/api/courses/:id', (req, res) => {
    // res.send(req.params);
    // res.send(req.query);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));