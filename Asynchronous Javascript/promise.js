
console.log('before');

// Create a promise:
// Constructor function, with one argument function, this function takes two arguments
// resolve and reject arguments are functions.
const promise = new Promise((resolve, reject) => {
	// Kick off some async work...
	setTimeout(() => {
		resolve(1); // pending -> resolved or fulfilled
		reject(new Error('something happend with the response of this.')); // pending -> rejected
	}, 2000);
});


// Consumed this promise:
promise
	.then(result => console.log('Result: ', result))
	.catch(err => console.log('Error: ', err.message));



console.log('after');
