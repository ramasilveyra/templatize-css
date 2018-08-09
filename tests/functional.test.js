import { compile, compileFile } from '../src/index';
import { getTestCase, getFixturePath, getFixture } from './utils';

describe('while using templatizeCss.compile()', () => {
  it('should convert simple CSS file to js template', async () => {
    const { input, output } = await getTestCase('simple');
    const result = compile(input);
    expect(result).toBe(output);
  });
  it('should convert CSS file with extra decls to js template', async () => {
    const { input, output } = await getTestCase('with-extra-decls');
    const result = compile(input);
    expect(result).toBe(output);
  });
  it('should convert CSS file with multiple rules to js template', async () => {
    const { input, output } = await getTestCase('multiple-rules');
    const result = compile(input);
    expect(result).toBe(output);
  });
  it('should convert CSS file with no var to track to js template', async () => {
    const { input, output } = await getTestCase('no-track');
    const result = compile(input);
    expect(result).toBe(output);
  });
  it('should convert CSS file with media queries to js template', async () => {
    const { input, output } = await getTestCase('media-queries');
    const result = compile(input);
    expect(result).toBe(output);
  });
  it('should convert complex CSS file to js template', async () => {
    const { input, output } = await getTestCase('complex');
    const result = compile(input);
    expect(result).toBe(output);
  });
  it('should convert CSS file with multiple decls to js template', async () => {
    const { input, output } = await getTestCase('multiple-decls');
    const result = compile(input);
    expect(result).toBe(output);
  });
});

describe('while using templatizeCss.compileFile()', () => {
  it('should convert css file to js template', async () => {
    const fixture = 'compile-file';
    const inputPath = getFixturePath(`${fixture}/input.css`);
    const outputPathTemplate = getFixturePath(`${fixture}/template.js`);
    await compileFile(inputPath, outputPathTemplate);
    const outputEJS = await getFixture(`${fixture}/template.js`);
    expect(outputEJS).toMatchSnapshot();
  });
});
