function getUser(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Reading a user from a database...');
			resolve({ id, gitHubUsername: 'yamitrvg12' });
		}, 2000);
	});
}

function getRepositories(userName) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(`Calling github API from: ${userName}...`);
			resolve(['repo 1', 'repo 2', 'repo 3', 'repo 4']);
		}, 2700);
	});
}

function getCommits(repo) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Calling github API to get a single commit:...');
			resolve({
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
	});
}

console.log('before');

// Consuming Promises
getUser(1)
	.then(user => getRepositories(user.gitHubUsername))
	.then(repo => getCommits(repo[0]))
	.then(commit => console.log(`Commit message: ${commit.message}`))
	.catch(err => console.log('Error: '. err.message));

console.log('after');
