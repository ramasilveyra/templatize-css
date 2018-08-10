import postcss from 'postcss';
import { camelCase } from 'lodash';

export default function codeGenerator(info) {
  const css = generateCss(info.ast);
  const templateRaw = generateTemplateRaw(css, info.tracks);
  const template = fixLocals(templateRaw, info.tracks);
  return template;
}

function generateCss(ast) {
  let css = '';
  postcss.stringify(ast, i => {
    css += i;
  });
  return css;
}

function generateTemplateRaw(css, tracks) {
  const tracksLast = tracks.length - 1;
  const defaultsPrettyObj = tracks.reduce(
    (str, track, i) =>
      `${str}\n  ${track.nameJs}: ${
        track.defaultValue.includes("'")
          ? JSON.stringify(track.defaultValue)
          : `'${track.defaultValue}'`
      }${i === tracksLast ? '' : ','}`,
    ''
  );
  const defaultsPretty = `{${defaultsPrettyObj ? `${defaultsPrettyObj}\n` : ''}}`;

  const isEmpty = css === '';
  const template = `const defaults = ${defaultsPretty};

const templatize = ${isEmpty ? '()' : 'locals'} => ${isEmpty ? "''" : `\`${css}\``};

module.exports = { defaults, templatize };
`;
  return template;
}

function fixLocals(templateRaw, tracks) {
  let template = templateRaw;
  tracks.forEach(track => {
    const jsVarName = camelCase(track.name);
    template = template.replace(
      new RegExp(`var\\(${track.name}\\)`, 'g'),
      `\${locals.${jsVarName} || defaults.${jsVarName}}`
    );
  });
  return template;
}
