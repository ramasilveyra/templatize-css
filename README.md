<div align="center">
  <a href="https://www.npmjs.com/package/templatize-css">
    <img src="https://img.shields.io/npm/v/templatize-css.svg?maxAge=86400" alt="Last npm Registry Version">
  </a>
  <a href="https://travis-ci.org/ramasilveyra/templatize-css?branch=master">
    <img src="https://travis-ci.org/ramasilveyra/templatize-css.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://codecov.io/github/ramasilveyra/templatize-css?branch=master">
    <img src="https://img.shields.io/codecov/c/github/ramasilveyra/templatize-css.svg?branch=master" alt="Code coverage">
  </a>
</div>

<h1 align="center">Templatize CSS files</h1>

> Do you want to generate dynamic CSS and you can't use CSS in JS?

<h3 align="center">Input</h3>

```css
:root {
  --main-primary-color: brown; /* templatize-css: track */
  --main-mobile-primary-color: brown; /* templatize-css: track */
  --main-text-color: #fff; /* templatize-css: track */
  --main-link-color: #000;
}

.btn {
  background-color: var(--main-primary-color);
  color: var(--main-text-color);
  border: 0;
  padding: 10px 40px;
}

.btn-link {
  background-color: var(--main-link-color);
  border: 0;
  padding: 10px 40px;
}

@media (min-width: 992px) {
  .btn::after {
    background-color: var(--main-mobile-primary-color);
    padding: 5px 10px;
  }
}
```

<h3 align="center">Output</h3>

```js
const defaults = {
  mainPrimaryColor: 'brown',
  mainMobilePrimaryColor: 'brown',
  mainTextColor: '#fff'
};

const templatize = locals => `.btn {
  background-color: ${locals.mainPrimaryColor || defaults.mainPrimaryColor};
  color: ${locals.mainTextColor || defaults.mainTextColor}
}
@media (min-width: 992px) {
  .btn::after {
    background-color: ${locals.mainMobilePrimaryColor || defaults.mainMobilePrimaryColor}
  }
}`;

module.exports = { defaults, templatize };
```

<h2 align="center">Table of Contents</h2>

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

<h2 align="center">Install</h2>

**Node.js v8 or newer** is required.

Via the yarn client:

```bash
$ yarn add --dev templatize-css
```

Via the npm client:

```bash
$ npm install --save-dev templatize-css
```

<h2 align="center">Usage</h2>

<h3 align="center">API</h3>

#### Compile

```js
import { compile } from 'templatize-css';

const css = `:root {
  --main-bg-color: brown; /* templatize-css: track */
}

.btn {
  background-color: var(--main-bg-color);
}
`;

const template = compile(css);
```

#### Compile File

```js
import path from 'path';
import { compileFile } from 'templatize-css';

const cssFilePath = path.resolve(__dirname, 'input.css');
const templateFilePath = path.resolve(__dirname, 'template.js');

compileFile(cssFilePath, templateFilePath).then(() => {
  console.log('File Compiled! 🍕');
});
```

<h3 align="center">CLI</h3>

#### Compile File (`--out-file`/`-o`)

```bash
templatize-css src/main.css --out-file src/template-main-css.js
```

<h2 align="center">Contribute</h2>

Feel free to dive in! [Open an issue](https://github.com/ramasilveyra/templatize-css/issues/new) or submit PRs.

templatize-css follows the [Contributor Covenant](https://contributor-covenant.org/version/1/4/) Code of Conduct.

<h2 align="center">License</h2>

[MIT](LICENSE.md)
