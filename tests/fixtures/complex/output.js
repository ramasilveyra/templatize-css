module.exports = function templatizeCSS(locals) {
  const css = `.btn {
  background-color: ${locals.mainPrimaryColor};
  color: ${locals.mainTextColor}
}
@media (min-width: 992px) {
  .btn::after {
    background-color: ${locals.mainMobilePrimaryColor}
  }
}`;
  return css;
};
