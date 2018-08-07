import fs from 'fs';
import path from 'path';
import util from 'util';

export async function getTestCase(folder) {
  const input = await getFixture(`${folder}/input.css`);
  const output = await getFixture(`${folder}/output.js`);
  return { input, output };
}

const readFileAsync = util.promisify(fs.readFile);

export async function getFixture(file) {
  try {
    const filePath = getFixturePath(file);
    const fileContent = await readFileAsync(filePath, { encoding: 'utf8' });
    return fileContent;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return null;
    }
    throw err;
  }
}

export function getFixturePath(file) {
  const filePath = path.resolve(__dirname, 'fixtures', file);
  return filePath;
}
