const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');

const base = path.join(__dirname, 'start');

const getContent = () => `
\n${process.argv[2] ?? ''}
`;
async function start() {
  try {
    if (fsSync.existsSync(base)) {
      fs.appendFile(path.join(base, 'logs.txt'), getContent());
      const logs = await fs.readFile(path.join(base, 'logs.txt'), {
        encoding: 'utf-8',
      });
      console.log(logs);
    } else {
      await fs.mkdir(base);
      fs.writeFile(path.join(base, 'logs.txt'), getContent());
    }
  } catch (error) {
    console.log('err', error);
  }
}

start();
