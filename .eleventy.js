const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const NavigationPlugin = require('@11ty/eleventy-navigation');
const ErrorOverlayPlugin = require('eleventy-plugin-error-overlay');

const filters = require('./utils/filters');
const markdown = require('./utils/markdown');
const shortcodes = require('./utils/shortcodes');
const transforms = require('./utils/transforms');

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
  config.addPairedShortcode('markdown', shortcodes.markdown);
  config.addLiquidShortcode('image', shortcodes.image);
  config.addLiquidShortcode('webpack', shortcodes.webpack);

  config.addPassthroughCopy('src/favicon.ico');

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
    // Speed/clean up build time
    ui: false,
    ghostMode: false,
  });

  return {
    dir: { input: 'src', output: 'build', includes: 'includes', data: 'data' },
    // Allow nunjucks, markdown and 11ty files to be processed
    templateFormats: ['liquid', 'md', '11ty.js'],
    htmlTemplateEngine: 'liquid',
  };
};
