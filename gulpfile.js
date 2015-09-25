var gulp = require('gulp');
var connect = require('gulp-connect');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');

gulp.task('typescriptCompile', function(){
	var tsResult = gulp.src('app/typescript/*.ts')
	    .pipe(ts({
	        noImplicitAny: true,
	        out: 'app.js'
	      }));
  	return tsResult.js.pipe(gulp.dest('app/js'));
});

gulp.task('connect', function() {
  connect.server({
    port: 8001,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  watch(['./app/typescript/*.ts'], function() {
    gulp.start('typescriptCompile');
  });
  watch(['./app/*.html'], function() {
    gulp.start('html');
  });
});
 
gulp.task('default', ['typescriptCompile', 'connect', 'watch']);