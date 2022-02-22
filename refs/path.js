const path = require('path');

console.log(path.dirname(__dirname));
console.log(path.dirname(__filename));
console.log(path.resolve(__dirname, '..', './modules', './test.js'));
console.log(path.join(__dirname, '..', './modules', './test.js'));
