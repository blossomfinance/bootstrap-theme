#!/usr/bin/env node

'use strict';

const fs = require('fs');
const stripCssComments = require('strip-css-comments');
const theme = require('./../');

// build to capture any changes
theme.compileSass();
theme.buildStyleguide();

// remove html
const css = fs.readFileSync(theme.cssDestFile(), 'utf8');
const output = stripCssComments(css);

fs.writeFileSync(theme.cssDestCleanFile({
  preserve: false,
  whitespace: true,
}), output, 'utf8');
