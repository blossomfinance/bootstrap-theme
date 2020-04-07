#!/usr/bin/env node

'use strict';

const theme = require('./../');

try {
  // start the livereload
  theme.browserSync();
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err);
}
