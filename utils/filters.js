const util = require('util');
const { format, formatISO } = require('date-fns');
const markdown = require('./markdown');

module.exports = {
  format: format,
  formatISO: formatISO,

  log: (data) => console.log(`\n\n${util.inspect(data)}\n\n`),
  markdown: (content) => markdown.renderInline(content),
  section: (content, section) => {
    return content.filter((doc) => doc.data.section === section);
  },
  strip_page_headings: (content) => {
    return content.replace(/<h1[^>]*?>.*?<\/h1>/gi, '');
  },
  split_content: (content, pageUrl) => {
    const regex = new RegExp(/(<h\d[^>]*?>.*?<\/h\d>)/gi);
    const parts = content
      .split(regex)
      .map((part) => part.trim())
      .filter((part) => !!part);

    const result = [];

    parts.forEach((part, index) => {
      const matchTitle = part.match(/(?<=<h[^>]*?>).*?(?=<\/h\d>)/gi);

      result[index] = { title: '', content: '', url: pageUrl };

      if (matchTitle) {
        result[index].title = matchTitle[0];
        result[index].url =
          pageUrl + '#' + part.match(/(?<=id=\").*?(?=\")/gi)[0];
      } else if (result[index - 1]) {
        result[index - 1].content = part;
      } else {
        result[index].content = part;
      }
    });

    return result.filter((part) => part.title && part.content);
  },
  strip_code: (content) => {
    return content.replace(/<pre>(\r\n|\r|\n|.)*?<\/pre>/g, '');
  },
  strip_extra_whitespaces: (content) => {
    return content.replace(/\s{2,}/g, ' ');
  },
};
