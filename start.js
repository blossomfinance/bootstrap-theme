#!/usr/bin/env node

'use strict';

const theme = require('./index');

// start the livereload
theme.browserSync();
