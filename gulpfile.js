var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('js', function () {
	gulp.src('timerizer.js')
		.pipe(uglify())
		.pipe(rename('timerizer.min.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('default', ['js'], function () {
	gulp.watch('timerizer.js', ['js']);
});
