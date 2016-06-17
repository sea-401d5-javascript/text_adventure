const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('copy', () => {
  return gulp.src(__dirname + '/app/index.html')
    .pipe(gulp.dest(__dirname + '/build'));
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

gulp.task('default', ['bundle:test', 'bundle', 'copy']);
//
// gulp.task('webpack:dev', function() {
//   return gulp.src('./app/js/client.js')
//     .pipe(webpack({
//       output: {
//         filename: 'bundle.js'
//       }
//     }))
//     .pipe(gulp.dest('build/'));
// });
//
// gulp.task('staticfiles:dev', function() {
//   return gulp.src('./app/**/*.html')
//   .pipe(gulp.dest('build/'));
// });
//
// gulp.task('staticcssfiles:dev', function() {
//   return gulp.src('./app/css/*.css')
//   .pipe(gulp.dest('build/'));
// });
//
// gulp.task('build:dev', ['staticfiles:dev','staticcssfiles:dev', 'webpack:dev']);
// gulp.task('default', ['build:dev']);
