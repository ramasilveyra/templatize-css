import postcss from 'postcss';

export default function parser(css) {
  const ast = postcss.parse(css);
  return ast;
}
