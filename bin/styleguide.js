#!/usr/bin/env node

'use strict';

const theme = require('./../');

try {
  // build to capture any changes
  theme.compileSass();
  theme.buildStyleguide();

  // start the livereload
  theme.browserSync();
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err);
}
