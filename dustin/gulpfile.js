'use strict';
const gulp = require('gulp');
const webpack = require('webpack-stream');
const livereload = require('gulp-livereload');

//paths object to save file paths for ease as gulpfile gets larger
var paths = {
  dev: {
    css: 'app/css/**/*.css',
    html: 'app/**/*.html',
    js: 'app/js/**/*.js',
    test: 'test/*_test.js'
  },
  build: {
    main: 'build/',
    css: 'build/css',
    js: 'build/js',
    test: 'test/'
  }
};

gulp.task('watch', function () {
  gulp.watch(paths.dev.html, ['staticfiles:dev']);
  gulp.watch(paths.dev.js, ['webpack:dev']);
  gulp.watch(paths.dev.css, ['staticcssfiles:dev']);
});

gulp.task('test:watch', function () {
  gulp.watch(paths.dev.test, ['bundle:test']);
});

gulp.task('webpack:dev', function () {
  return gulp.src('./app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest(paths.build.main));
});

gulp.task('bundle:test', () => {
  return gulp.src(__dirname + '/test/*_test.js')
  .pipe(webpack({
    output: {
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest(__dirname + '/test'));
});

gulp.task('staticfiles:dev', function () {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build/'))
    .pipe(livereload());
});

gulp.task('staticcssfiles:dev', function () {
  return gulp.src('./app/css/*.css')
    .pipe(gulp.dest('build/'));
});

gulp.task('build:dev', ['staticfiles:dev', 'staticcssfiles:dev', 'webpack:dev']);
gulp.task('default', ['build:dev']);
