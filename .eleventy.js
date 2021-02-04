const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const ErrorOverlayPlugin = require('eleventy-plugin-error-overlay');

const filters = require('./utils/filters');
const markdown = require('./utils/markdown');
const shortcodes = require('./utils/shortcodes');
const transforms = require('./utils/transforms');
const NavigationPlugin = require('./utils/navigation');
const docsCollection = require('./utils/docsCollection');

module.exports = (config) => {
  const manifestPath = path.resolve(__dirname, 'build/assets/manifest.json');

  config.setLibrary('md', markdown);

  config.addDataExtension('yml', (contents) => yaml.safeLoad(contents));

  config.addPlugin(NavigationPlugin);
  config.addPlugin(ErrorOverlayPlugin);

  Object.keys(filters).forEach((key) => {
    config.addFilter(key, filters[key]);
  });

  Object.keys(transforms).forEach((key) => {
    config.addTransform(key, transforms[key]);
  });

  config.addShortcode('icon', shortcodes.icon);
  config.addShortcode('markdown', shortcodes.markdown);
  config.addShortcode('image', shortcodes.image);
  config.addShortcode('webpack', shortcodes.webpack);
  config.addShortcode('anchors', shortcodes.anchors);

  config.addPassthroughCopy('src/favicon.ico');

  config.addCollection('docs', docsCollection);

  config.setBrowserSyncConfig({
    ...config.browserSyncConfig,
    files: [manifestPath],
    callbacks: {
      ready: (err, browserSync) => {
        browserSync.addMiddleware('*', (req, res) => {
          const fourOFour = fs.readFileSync('build/404.html');
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.write(fourOFour);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  config.setFrontMatterParsingOptions({
    excerpt: true,
  });

  return {
    dir: { input: 'src', output: 'build', includes: 'includes', data: 'data' },
    templateFormats: ['liquid', 'md', '11ty.js'],
    htmlTemplateEngine: 'liquid',
  };
};
