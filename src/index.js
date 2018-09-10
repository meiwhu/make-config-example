import commander from 'commander';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import reset from './reset';
import packageFile from '../package.json';

const TYPES = {
  JSON: ['.json'],
  ENV: ['.env'],
};

const supportType = [
  ...TYPES.JSON,
  ...TYPES.ENV,
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

  if (TYPES.ENV.includes(ext)) {
    const buf = fs.readFileSync(filepath);
    const envs = dotenv.parse(buf);
    retString = Object.keys(envs).map(key => `${key}=`).join('\n');
  }

  if (TYPES.JSON.includes(ext)) {
    const json = fs.readFileSync(filepath).toString();
    const jsonObj = JSON.parse(json);
    const resetObj = reset(jsonObj);
    retString = JSON.stringify(resetObj, null, 2);
  }

  // write file
  const targetFilePath = path.resolve(process.cwd(), `${filepath}.example`);
  fs.writeFileSync(targetFilePath, retString);
}
