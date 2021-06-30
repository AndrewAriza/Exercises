const fs = require('fs');
const main = () => {
    fs.readFile('./src/record/records.txt', 'utf8', (err, data) => {
        if (err) throw err;
        const domains = data.split('\n').map((line) => line.split(' - - ')[0]);
        const countDomains = {};

        domains.forEach((domain) => {
            countDomains[domain] = countDomains[domain] ? countDomains[domain] + 1 : 1;
        })

        for (const domain in countDomains) {
            if (Object.hasOwnProperty.call(countDomains, domain)) {
                console.log(domain, countDomains[domain]);
            }
        }
    });
}

main();