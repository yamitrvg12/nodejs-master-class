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
		console.log('Calling github API to get a single commit:...');
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

// Named functions to avoid Callback Hell
// We passing a reference of the function, we don't calling

function displayCommits(commit) {
	console.log(`Commit message: ${commit.message}`);
}

function displayRepositories(repos) {
	console.log(`Repositories: ${repos}`);
	getCommits(repos[0], displayCommits);
}

function displayUser(user) {
	console.log(`User: ${user.gitHubUsername}`);
	getRepositories(user.gitHubUsername, displayRepositories);
}


console.log('before');

// CALLBACK HELL
// Deeply nested structure
getUser(1, displayUser);

console.log('after');
