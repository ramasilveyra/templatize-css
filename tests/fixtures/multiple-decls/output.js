module.exports = function templatizeCSS(locals) {
  const css = `.btn {
  background-color: ${locals.mainBgColor};
  border: 1px solid ${locals.mainBgColor}
}`;
  return css;
};
