'use strict';

const initBrowserSync = require('browser-sync');
const fs = require('fs');
const livingcss = require('livingcss');
const path = require('path');
const sass = require('node-sass');

const pkg = require('./package.json');

function sassSrcFile() {
  return path.join(__dirname, pkg.srcDir, pkg.srcFile);
}

function sassSrcGlob() {
  return path.join(pkg.srcDir, '*.scss');
}

function cssDestDir() {
  return path.join(__dirname, pkg.destDir);
}

function cssDestFile() {
  return path.join(__dirname, pkg.destDir, pkg.destFile);
}

function cssDestCleanFile() {
  return path.join(__dirname, pkg.destDir, pkg.destCleanFile);
}

function cssDestGlob() {
  return path.join(cssDestDir(), '*.css');
}

function cssDestWebUrl() {
  return pkg.destFile;
}

function htmlDestFileGlob() {
  return path.join(pkg.destDir, '*.html');
}

function compileSass() {
  // compile sass files
  const sassOutput = sass.renderSync({
    file: sassSrcFile(),
  });
  // write out compiled sass
  fs.writeFileSync(cssDestFile(), sassOutput.css);
}

function buildStyleguide() {
  // build styleguide into index.html file
  livingcss(sassSrcGlob(), cssDestDir(), {
    preprocess: function (context) {
      context.title = 'Blossom Bootstrap Theme';
      context.footerHTML = '&copy; Blossom Labs, Inc. https://blossomfinance.com/';
      context.globalStylesheets = [
        cssDestWebUrl(),
      ];
      context.scripts.push('https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js');
    },
  });
}


module.exports = {
  sassSrcFile,
  sassSrcGlob,
  cssDestFile,
  cssDestCleanFile,
  cssDestGlob,
  compileSass,
  buildStyleguide,
  browserSync: function browserSync() {
    return initBrowserSync({
      // serve the files and inject the reload snippet
      server: {
        baseDir: pkg.destDir,
        index: 'overview.html',
      },

      serveStatic: [{
        route: 'webfonts',
        dir: path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'),
      }, {
        route: 'fonts',
        dir: path.join(__dirname, 'node_modules/@blossomfinance/svg-webfont-icons/dist/fonts'),
      }],

      // allow serving in heroku
      port: process.env.PORT || '3000',

      // avoid inlining css, which is the default
      loadcss: false,

      // extra info on command line
      logFileChanges: true,
      logConnections: true,

      // two things to watch:
      // 1. source code, need to rebuild living style guide
      // 2. compiled styleguide html, need to reload browser
      files: [
        // rebuild when source code has changed
        {
          match: [sassSrcGlob()],
          fn: function () {
            try {
              compileSass();
              buildStyleguide();
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error(err);
            }
          },
        },

        // reload when html page updates
        htmlDestFileGlob(),
      ],
    });
  },
};
