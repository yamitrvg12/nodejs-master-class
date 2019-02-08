function getUser(id, callback) {
	setTimeout(() => {
		console.log('Reading a user from a database...');
		callback({ id, gitHubUsername: 'yamitrvg12' });
	}, 2000);
}

function getRepositories(userName, callback) {
	setTimeout(() => {
		console.log(`Calling github API from: ${userName}...`);
		callback(['repo 1', 'repo 2', 'repo 3', 'repo 4']);
	}, 2000);
}

console.log('before');

getUser(1, (user) => {
	// Get the userName
	console.log(`User: ${user.gitHubUsername}`);

	// Get the respositories
	getRepositories(user.gitHubUsername, (repos) => {
		console.log(`Repositories: ${repos}`);
	});
});

console.log('after');
