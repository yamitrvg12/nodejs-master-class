const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Yamit Villamil',
        message: 'This is a simple example of loading a markup'
    }); // arguments: name of the view (index.pug), object that include all the values of the index.pug
});

module.exports = router;