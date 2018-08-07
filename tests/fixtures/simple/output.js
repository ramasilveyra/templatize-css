module.exports = function templatizeCSS(locals) {
  const css = `.btn {
  background-color: ${locals.mainBgColor}
}`;
  return css;
};
