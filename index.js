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

function cssDestFile() {
  return path.join(__dirname, pkg.destDir, pkg.destFile);
}

function cssDestGlob() {
  return path.join(pkg.destDir, '*.css');
}

function cssDestWebUrl() {
  return path.join(pkg.destDir, pkg.destFile);
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
  livingcss(cssDestGlob(), {
    preprocess: function(context, template, Handlebars) {
      context.title = 'Blossom Bootstrap Theme';
      context.footerHTML = '&copy; Blossom Labs, Inc. https://blossomfinance.com/';
      context.globalStylesheets = [cssDestWebUrl()];
    }
  });
}


module.exports = {
  sassSrcFile,
  sassSrcGlob,
  cssDestFile,
  cssDestGlob,
  compileSass,
  buildStyleguide,
  browserSync: function browserSync() {
    return initBrowserSync({
      loadcss: false,
      logFileChanges: true,
      // two things to watch:
      // 1. source code, need to rebuild living style guide
      // 2.
      files: [
        // rebuild when source code has changed
        {
          match: [sassSrcGlob()],
          fn: function() {
            try {
              compileSass();
              buildStyleguide();
            } catch (err) {
              console.error(err);
            }
          }
        },

        // reload when html page updates
        '*.html'
      ],
      // serve the files and inject the reload snippet
      server: true,
    });
  }
};
