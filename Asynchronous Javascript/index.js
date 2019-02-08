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
	}, 2700);
}

function getCommits(repo, callback) {
	setTimeout(() => {
		console.log(`Calling github API to get a single commit:...`);
		callback({
			url: 'https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09',
			author: {
				name: 'Monalisa Octocat',
			},
			committer: {
				name: 'Monalisa Octocat',
				email: 'support@github.com',
				date: '2011-04-14T16:00:49Z',
			},
			message: 'Fix all the bugs',
			comment_count: 0,
		});
	}, 2000);
}

console.log('before');

// CALLBACK HELL
// Deeply nested structure
getUser(1, (user) => {
	// Get the userName
	console.log(`User: ${user.gitHubUsername}`);

	// Get the respositories
	getRepositories(user.gitHubUsername, (repos) => { // CALLBACK HELL
		// Get list of repositories
		console.log(`Repositories: ${repos}`);

		// Get a single commit
		getCommits(repos[0], (commit) => { // CALLBACK HELL
			// Get commit message from the last repo
			console.log(`Commit message: ${commit.message}`);
		});
	});
});

console.log('after');
