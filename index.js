const commander = require('commander');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const supportType = [
  '.env',
];

commander
  .version('0.0.1')
  .option('-i, --input <filepath>', 'origin config file path')
  .option('-t, --type <type>', `config type:${supportType.join(', ')}`)
  .parse(process.argv);

if (!commander.input) {
  console.log('Error: no input.\n');
  process.exit();
}

if (!commander.type) {
  const ext = path.extname(`X${commander.input}`);
  if (!supportType.includes(ext)) {
    console.log(`Error: not supprot ${ext} file`);
    process.exit();
  }

  // check file
  const filepath = path.resolve(process.cwd(), commander.input);
  try {
    fs.accessSync(filepath);
  } catch (err) {
    console.log('Error: file not exist');
    process.exit();
  }

  let retString = '';

  if (ext === '.env') {
    const buf = fs.readFileSync(filepath);
    const envs = dotenv.parse(buf);
    retString = Object.keys(envs).map(key => `${key}=`).join('\n');
  }

  // write file
  const targetFilePath = path.resolve(process.cwd(), `${filepath}.example`);
  fs.writeFileSync(targetFilePath, retString);
}
