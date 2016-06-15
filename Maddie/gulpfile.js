'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');

const paths = {
  html: __dirname + '/app/index.html',
  js: __dirname + '/app/js/client.js',
  css:__dirname + '/app/css/style.css'

};

gulp.task('copy', () => {
  gulp.src(paths.html)
    .pipe(gulp.dest('./build/'));
});

gulp.task('copyCSS', () => {
  gulp.src(paths.css)
    .pipe(gulp.dest('./build'));
});

gulp.task('bundle', () => {
  gulp.src(paths.js)
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('build', ['copy', 'copyCSS', 'bundle']);
