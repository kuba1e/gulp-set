'use strict';

const { task, src, dest, series, watch } = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer')
const { reloadServer } = require('./server');
const config = require('../config');

const imgProcessing = () => {
  return src(config.src.img)
    .pipe(newer(config.dest.img))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 1}),
      imagemin.svgo(),
    ]))
    .pipe(dest(config.dest.img));
};

const minifyImg = () => {
  return watch(
    config.watch.img,
    {ignoreInitial: false},
    series(imgProcessing, reloadServer),
  );
};

exports.default = task(minifyImg);
