'use strict';
const gulp = require('gulp');
const webpack = require('webpack-stream');
const clean = require('gulp-clean');

const paths = {
  js:__dirname + '/app/js/*.js',
  html: __dirname + '/app/*.html',
  css: __dirname + '/app/css/*.css'
};

gulp.task('clean', () => {
  return gulp.src('build/*', {read:false})
    .pipe(clean());
});

gulp.task('copy', ['clean'], () => {
  return gulp.src(paths.html)
    .pipe(gulp.dest('./build'));
});

gulp.task('copyTwo', ['clean'], () => {
  return gulp.src(paths.css)
    .pipe(gulp.dest('./build'));
});

gulp.task('bundle', ['clean'], () => {
  return gulp.src(paths.js)
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
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

gulp.task('watch', () => {
  gulp.watch('./app/*', ['build']);
});

gulp.task('build', ['clean','copy','copyTwo','bundle' ]);
gulp.task('defualt', ['build']);
