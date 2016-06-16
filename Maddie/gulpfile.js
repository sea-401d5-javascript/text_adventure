'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');
const del = require('del');
const Server = require('karma').Server;

const paths = {
  html: __dirname + '/app/index.html',
  js: __dirname + '/app/js/client.js',
  css:__dirname + '/app/css/style.css',
  test:__dirname + '/test/*_test.js'

};

gulp.task('clean', () => {
  return del('./build/**/*');
});

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

gulp.task('bundle:test', () => {
  gulp.src(paths.test)
  .pipe(webpack({
    output: {
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest(__dirname + '/test'));
});

gulp.task('karma', ['bundle:test'], (done) => {
  new Server({
    configFile:__dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('build', [ 'bundle','clean','copy', 'copyCSS']);
gulp.task('test:client', ['bundle:test', 'karma']);
