#!/usr/bin/env node

'use strict';

if (process.env.APP === 'styleguide') {
  require('./styleguide');
} else {
  require('./../app');
}
