const gulp = require('gulp');
const less = require('gulp-less');

gulp.task('default', function(){
	return gulp.watch('*.less', ['less']);
});

gulp.task('less', function(){
	return gulp.src('*.less')
			.pipe(less())
			.pipe(gulp.dest('./'));
});