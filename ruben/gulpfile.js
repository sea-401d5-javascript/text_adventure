const gulp = require('gulp');
const webpack = require('webpack-stream');

const paths = {
  js: __dirname + '/app/js/client.js',
  html: __dirname + '/app/index.html',
  css: __dirname + '/app/css/app.css'
};

gulp.task('copy', () => {
  gulp.src([paths.html, paths.css, __dirname + '/app/img/*.jpg'])
    .pipe(gulp.dest('./build'));
});

gulp.task('bundle', () => {
  return gulp.src(__dirname + '/app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('bundle:test', () => {
  return gulp.src(__dirname + '/test/*test.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/test'))
});

gulp.task('watch', () => {
  gulp.watch('./app/index.html', ['copy']);
  gulp.watch('./app/js/client.js', ['bundle']);
  gulp.watch('./app/css/app.css', ['copy']);
});

gulp.task('default', ['bundle:test', 'bundle', 'copy',]);
