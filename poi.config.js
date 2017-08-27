'use strict';

const isDemo = process.env.NODE_ENV !== 'production';
const path = require('path');
const pack = require('./package.json');

module.exports = {
  vendor: false,
  extractCSS: isDemo,
  html: isDemo ? {
    title: `${pack.name} Demo`,
    template: './demo/index.ejs'
  } : false,
  removeDist: !isDemo,
  webpack(config) {
    if (isDemo) {
      config.entry.client.unshift('babel-polyfill');
      return config;
    }

    // set UMD options
    const parsed = path.parse(config.entry.client[0]);
    config.output.libraryTarget = 'umd';
    config.output.library = parsed.name; // file
    config.output.filename = parsed.base; // file.js
    return config;
  },
};
