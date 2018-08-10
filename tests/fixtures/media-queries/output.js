const defaults = {
  mainBgColor: 'brown'
};

const templatize = locals => `@media (min-width: 992px) {
    .btn::after {
    background-color: ${locals.mainBgColor || defaults.mainBgColor}
    }
}`;

module.exports = { defaults, templatize };
