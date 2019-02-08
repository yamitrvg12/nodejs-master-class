function getUser(id) {
	setTimeout(() => {
		console.log('Reading a user from a database...');
		return {
			id,
			gitHubUsername: 'yamitrvg12',
		};
	}, 2000);
}

console.log('before');

const user = getUser(1);
console.log(user);

console.log('after');
