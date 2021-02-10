const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttributes = require('markdown-it-attrs');
const markdownItBracketedSpans = require('markdown-it-bracketed-spans');
const markdownItHighlight = require('markdown-it-highlight').default;
const markdownItVideo = require('markdown-it-video');

const markdown = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})
  .use(markdownItBracketedSpans)
  .use(markdownItAttributes)
  .use(markdownItAnchor)
  .use(markdownItHighlight)
  .use(markdownItVideo, {
    youtube: { width: 820, height: 461 },
  });

markdown.renderer.rules.table_open = function (tokens, idx, options, self) {
  return `<div class='table-wrapper'>` + self.renderToken(tokens, idx, options);
};

markdown.renderer.rules.table_close = function (tokens, idx, options, self) {
  return self.renderToken(tokens, idx, options) + `</div>`;
};

module.exports = markdown;
