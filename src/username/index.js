const https = require('https');

const httpsHelper = async (page) => new Promise(function (resolve, reject) {
    const url = 'https://jsonmock.hackerrank.com/api/article_users?page=' + page;
    https.get(url, (res) => {
        res.setEncoding('utf8');
        return res.on('data', (body) => resolve(JSON.parse(body)));
    }).on('error', err => reject(err));
})

async function getUsernames(threshold) {
    const users = await httpsHelper(1);
    let usernames = users.data;
    for (let i = 2; i <= users.total_pages; i++) {
        const newUsers = await httpsHelper(i);
        const newUsernames = newUsers.data;
        usernames = usernames.concat(newUsernames);
    }
    return usernames.filter(
        (user) =>
            user.submission_count >= threshold
    ).map((a) => a.username);
}

Promise.resolve(getUsernames(10)).then(console.log);