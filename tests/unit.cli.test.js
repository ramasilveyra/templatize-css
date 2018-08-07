import pkg from '../package.json';

let templatizeCssCli = null;
let compileFile = null;

describe('while using templatizeCss cli', () => {
  beforeAll(() => {
    jest.mock('../src/index', () => ({
      compileFile: jest.fn((i, o, opts) => {
        opts.progress();
        return Promise.resolve();
      })
    }));
    jest.mock('ora', () =>
      jest.fn().mockImplementation(() => ({
        stopAndPersist: jest.fn(),
        start: jest.fn(),
        succeed: jest.fn(),
        fail: jest.fn()
      }))
    );
    const templatizeCss = require('../src/index'); // eslint-disable-line global-require
    templatizeCssCli = require('../src/cli').default; // eslint-disable-line global-require
    compileFile = templatizeCss.compileFile;
  });

  beforeEach(() => {
    /* eslint-disable no-console */
    process.exit = jest.fn().mockReset();
    console.log = jest.fn().mockReset();
    compileFile.mockClear();
  });

  it('should log initial message when no argument is passed', () => {
    templatizeCssCli([]);
    expect(process.exit.mock.calls.length).toEqual(0);
    expect(console.log.mock.calls.length).toEqual(1);
    expect(console.log.mock.calls[0][0]).toBe(
      `\u001b[1m\u001b[37m${pkg.name} v${pkg.version}\u001b[39m\u001b[22m`
    );
  });

  it('should log version and initial message with "-v" or "--version"', () => {
    templatizeCssCli(['-v']);
    templatizeCssCli(['--version']);
    expect(process.exit.mock.calls.length).toEqual(2);
    expect(console.log.mock.calls.length).toEqual(4);
    expect(console.log.mock.calls[0][0]).toBe(
      `\u001b[1m\u001b[37m${pkg.name} v${pkg.version}\u001b[39m\u001b[22m`
    );
    expect(console.log.mock.calls[1][0]).toBe(pkg.version);
  });

  it('should compile file with "some-component.css -o some-component.js"', async () => {
    const input = 'some-component.css';
    const output = 'some-component.js';
    const result = templatizeCssCli([input, '-o', output]);
    expect(process.exit.mock.calls.length).toEqual(0);
    expect(console.log.mock.calls.length).toEqual(1);
    expect(console.log.mock.calls[0][0]).toBe(
      `\u001b[1m\u001b[37m${pkg.name} v${pkg.version}\u001b[39m\u001b[22m`
    );
    expect(compileFile.mock.calls.length).toEqual(1);
    expect(compileFile.mock.calls[0][0]).toBe(input);
    expect(compileFile.mock.calls[0][1]).toBe(output);
    expect(typeof compileFile.mock.calls[0][2]).toBe('object');
    expect(typeof compileFile.mock.calls[0][2].progress).toBe('function');
    await expect(result).resolves.toBeUndefined();
  });

  it('should log error and exit if compile file with "some-component.css -o some-component.js" fails', async () => {
    const errorMsg = 'No such file';
    compileFile.mockImplementation((i, o, opts) => {
      opts.progress();
      return Promise.reject(new Error(errorMsg));
    });
    const input = 'some-component.css';
    const output = 'some-component.js';
    const result = templatizeCssCli([input, '-o', output]);
    expect(console.log.mock.calls.length).toEqual(1);
    expect(console.log.mock.calls[0][0]).toBe(
      `\u001b[1m\u001b[37m${pkg.name} v${pkg.version}\u001b[39m\u001b[22m`
    );
    expect(compileFile.mock.calls.length).toEqual(1);
    expect(compileFile.mock.calls[0][0]).toBe(input);
    expect(compileFile.mock.calls[0][1]).toBe(output);
    expect(typeof compileFile.mock.calls[0][2]).toBe('object');
    expect(typeof compileFile.mock.calls[0][2].progress).toBe('function');
    await expect(result).resolves.toBeUndefined();
    expect(process.exit.mock.calls.length).toEqual(1);
    expect(process.exit.mock.calls[0][0]).toEqual(1);
  });
});
