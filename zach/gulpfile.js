'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');
const del = require('del');
const Server = require('karma').Server;
const eslint = require('gulp-eslint');

const paths = {
  html: './app/**/*.html',
  js: './app/js/client.js',
  tests: './test/gamecontroller_test.js',
  css: './app/css/**/*.css'
};

gulp.task('webpack:dev', ['clean'], function() {
  return gulp.src(paths.js)
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('clean', () => {
  return del('./build/**/*');
});

gulp.task('staticfiles:dev', ['clean'], function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('build/'));
});

gulp.task('staticcssfiles:dev', ['clean'], function() {
  return gulp.src(paths.css)
    .pipe(gulp.dest('build/'));
});

gulp.task('build:dev', ['staticfiles:dev','staticcssfiles:dev', 'clean', 'webpack:dev']);
gulp.task('default', ['build:dev']);

gulp.task('bundle:test', () => {
  return gulp.src(paths.tests)
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('karma', ['bundle:test'], (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('test:client', ['bundle:test', 'karma']);

gulp.task('lint-app' , () => {
  return gulp.src('./app/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint-tests', () => {
  return gulp.src('./test/*_test.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint', ['lint-app', 'lint-tests']);
