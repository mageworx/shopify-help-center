const util = require('util');
const { format, formatISO } = require('date-fns');
const markdown = require('./markdown');

module.exports = {
  format: format,
  formatISO: formatISO,

  log: (data) => console.log(`\n\n${util.inspect(data)}\n\n`),
  markdown: (content) => markdown.renderInline(content),
  strip_headings: (content) => {
    return content.replace(/<h\d[^>]*?>(\r\n|\r|\n|.)*?<\/h\d>/g, '');
  },
  strip_code: (content) => {
    return content.replace(/<pre>(\r\n|\r|\n|.)*?<\/pre>/g, '');
  },
  strip_extra_whitespaces: (content) => {
    return content.replace(/\s{2,}/g, ' ');
  },
  strip_newlines: (content) => {
    return content.replace(/(\r\n|\n|\r)/g, ' ');
  },
};
