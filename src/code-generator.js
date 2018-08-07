import postcss from 'postcss';
import { camelCase } from 'lodash';

export default function codeGenerator(info) {
  const css = generateCss(info.ast);
  const templateRaw = generateTemplateRaw(css);
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

function generateTemplateRaw(css) {
  const isEmpty = css === '';
  const template = `module.exports = function templatizeCSS(${isEmpty ? '' : 'locals'}) {
  const css = ${isEmpty ? "''" : `\`${css}\``};
  return css;
};
`;
  return template;
}

function fixLocals(templateRaw, tracks) {
  let template = templateRaw;
  tracks.forEach(track => {
    template = template.replace(`var(${track.prop})`, `\${locals.${camelCase(track.prop)}}`);
  });
  return template;
}
