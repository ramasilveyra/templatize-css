const defaults = {
  mainBgColor: 'brown'
};

const templatize = locals => `.btn {
  background-color: ${locals.mainBgColor || defaults.mainBgColor}
}`;

module.exports = { defaults, templatize };
