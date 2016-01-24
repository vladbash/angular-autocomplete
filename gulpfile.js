var gulp = require('gulp'),
  concat=require('gulp-concat'),
	jsmin = require('gulp-jsmin'),
	uglify = require('gulp-uglify');

gulp.task('min',function(){
  gulp.src(['dev/autocomplete.js'])
    .pipe(jsmin())
    .pipe(uglify())
    .pipe(concat('autocomplete.min.js'))
    .pipe(gulp.dest('dest'));
});

gulp.task('build',function(){
  gulp.src(['dev/autocomplete.js'])
    .pipe(concat('autocomplete.js'))
    .pipe(gulp.dest('dest'));
});
