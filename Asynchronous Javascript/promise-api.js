const p1 = new Promise((resolve) => {
	setTimeout(() => {
		console.log(' Async Operation 1...');
		resolve(1);
	}, 2000);
});

const p2 = new Promise((resolve) => {
	setTimeout(() => {
		console.log(' Async Operation 2...');
		resolve(3);
		// reject(new Error('Error promise 2'));
	}, 2600);
});


// Promise.all -> If any of this promises is rejected, returns rejected all the promises.
// Return an array

// Promise.all([p1, p2])
// 	.then(result => console.log('Message: ', result))
// 	.catch(err => console.log('Error: ', err.message));


// If you want to do something as soon as one of these asynchronous operations complete.
// Return a value

Promise.race([p1, p2])
	.then(result => console.log('Message: ', result))
	.catch(err => console.log('Error: ', err.message));
