const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	// arguments: name of the view (index.pug), object that include all the values of the index.pug
	res.render('index', {
		title: 'Yamit Villamil',
		message: 'This is a simple example of loading a markup',
	});
});

module.exports = router;
