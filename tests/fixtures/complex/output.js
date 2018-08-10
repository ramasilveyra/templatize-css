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
