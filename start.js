#!/usr/bin/env node

'use strict';

const theme = require('./index');

try {

  // build to capture any changes
  theme.compileSass();
  theme.buildStyleguide();

  // start the livereload
  theme.browserSync();
} catch (err) {
  console.error(err);
}
