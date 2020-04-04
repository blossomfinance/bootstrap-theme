'use strict';

const initBrowserSync = require('browser-sync');
const fs = require('fs');
const livingcss = require('livingcss');
const path = require('path');
const sass = require('node-sass');

const pkg = require('./package.json');

function sassSrcFile() {
  return path.join(__dirname, pkg.src, 'custom.scss');
}

function sassSrcGlob() {
  return path.join(pkg.src, '*.scss');
}

function cssDestFile() {
  return path.join(__dirname, pkg.dest, 'all.css');
}

function cssDestGlob() {
  return path.join(pkg.dest, '*.css');
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
  livingcss(cssDestGlob());
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
      logFileChanges: true,
      // two things to watch:
      // 1. source code, need to rebuild living style guide
      // 2.
      files: [
        // rebuild when source code has changed
        {
          match: [sassSrcGlob()],
          fn: function() {
            compileSass();
            buildStyleguide();
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
