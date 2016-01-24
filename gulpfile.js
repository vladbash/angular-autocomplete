var gulp = require('gulp'),
  concat=require('gulp-concat'),
	jsmin = require('gulp-jsmin'),
	uglify = require('gulp-uglify');

gulp.task('min',function(){
  gulp.src(['autocomplete.js'])
    .pipe(jsmin())
    .pipe(uglify())
    .pipe(concat('autocomplete.min.js'))
    .pipe(gulp.dest(''));
})
