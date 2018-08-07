module.exports = function templatizeCSS(locals) {
  const css = `@media (min-width: 992px) {
    .btn::after {
    background-color: ${locals.mainBgColor}
    }
}`;
  return css;
};
