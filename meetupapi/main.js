var fs = require('fs');

var key = fs.readFileSync('api_key.txt', 'utf-8');
console.log(key);