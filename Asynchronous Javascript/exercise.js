function getCustomer(id) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id,
				name: 'Mosh Hamedani',
				isGold: true,
				email: 'email',
			});
		}, 4000);
	});
}

function getTopMovies() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(['movie1', 'movie2']);
		}, 4000);
	});
}

function sendEmail(email, movies) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// resolve();
			reject(new Error('Something happen with the send.'));
		}, 4000);
	});
}

async function notifyCustomerEmail() {
	try {
		const customer = await getCustomer(1);
		console.log('Customer: ', customer);

		if (customer.isGold) {
			const movies = await getTopMovies();
			console.log('Top movies: ', movies);

			await sendEmail(customer.email, movies);
			console.log('Email sent...');
		}
	} catch (err) {
		console.log('Error: ', err.message);
	}
}

notifyCustomerEmail();
