'use strict';

const fs = require('fs');
const livingcss = require('livingcss');
const path = require('path');
const sass = require('node-sass');


try {
  const sassInputFiles = path.join(__dirname, 'scss/custom.scss');
  const cssOutputFile = path.join(__dirname, 'dist/all.css');

  const sassOutput = sass.renderSync({
    file: sassInputFiles,
  });

  fs.writeFileSync(cssOutputFile, sassOutput.css);

  livingcss('dist/*.css');
} catch (err) {
  console.log(err);
}
