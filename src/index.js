import fs from 'fs';
import path from 'path';
import util from 'util';
import makeDir from 'make-dir';
import parser from './parser';
import transformation from './transformation';
import codeGenerator from './code-generator';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export function compile(input) {
  const ast = parser(input);
  const info = transformation(ast);
  const template = codeGenerator(info);
  return template;
}

export async function compileFile(inputFile, outputFile, { progress = () => {} } = {}) {
  const inputFilePath = path.resolve(process.cwd(), inputFile);
  const outputFilePath = path.resolve(process.cwd(), outputFile);
  const inputCode = await readFile(inputFilePath, { encoding: 'utf8' });
  const template = compile(inputCode);
  const outputFilePathDir = path.dirname(outputFilePath);
  await makeDir(outputFilePathDir);
  await writeFile(outputFilePath, template);
  const relativePath = path.join(process.cwd(), '/');
  progress(`${inputFile.replace(relativePath, '')} -> ${outputFile.replace(relativePath, '')}`);
}
