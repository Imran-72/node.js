const http = require('http');
const chalk = require('chalk');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log('Request-method', req.method);
  console.log('Request-url', req.url);
  res.end('Hello from server!');
});

server.listen(PORT, () => {
  console.log(chalk.greenBright(`Server has been started on port ${PORT}...`));
});
