module.exports = function (collection) {
  return collection.getFilteredByGlob('./src/docs/**/*.md').sort((a, b) => {
    if (a.data.title < b.data.title) return -1;
    if (a.data.title > b.date.title) return 1;

    return 0;
  });
};
