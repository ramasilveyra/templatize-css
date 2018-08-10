const defaults = {
  mainBgImage: "url('/static/bg.png')"
};

const templatize = locals => `.btn {
  background-image: ${locals.mainBgImage || defaults.mainBgImage}
}`;

module.exports = { defaults, templatize };
