var gulp = require('gulp'),
  concat = require('gulp-concat'),
  jsmin = require('gulp-jsmin'),
  uglify = require('gulp-uglify'),
  embedTemplates = require('gulp-angular-embed-templates');

gulp.task('min', function () {
  gulp.src(['dev/autocomplete.js'])
    .pipe(jsmin())
    .pipe(uglify())
    .pipe(concat('autocomplete.min.js'))
    .pipe(embedTemplates())
    .pipe(gulp.dest('dest'));
});

gulp.task('build', function () {
  gulp.src(['dev/autocomplete.js'])
    .pipe(concat('autocomplete.js'))
    .pipe(embedTemplates())
    .pipe(gulp.dest('dest'));
});

gulp.task('copy', function () {
  gulp.src('./dest/autocomplete.min.js')
    .pipe(gulp.dest('demo'));
});

gulp.task('watch', function(){
  gulp.watch('dev/*', ['default']);
});

gulp.task('default', ['build', 'min', 'copy']);
