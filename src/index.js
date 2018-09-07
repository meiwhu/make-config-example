#!/usr/bin/env node

const commander = require('commander');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const packageFile = require('../package.json');

const supportType = [
  '.env',
];

commander
  .version(packageFile.version)
  .option('-i, --input <filepath>', 'origin config file path')
  .option('-t, --type <type>', `config type:${supportType.join(', ')}`)
  .parse(process.argv);

if (!commander.input) {
  throw new Error('Error: no input.\n');
}

if (!commander.type) {
  const ext = path.extname(`X${commander.input}`);
  if (!supportType.includes(ext)) {
    throw new Error(`Error: not supprot ${ext} file`);
  }

  // check file
  const filepath = path.resolve(process.cwd(), commander.input);
  try {
    fs.accessSync(filepath);
  } catch (err) {
    throw new Error('Error: file not exist');
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
