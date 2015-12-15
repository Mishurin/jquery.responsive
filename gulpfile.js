var gulp = require('gulp');
var uglify = require('gulp-uglify');

var paths = {
	scripts: ['jquery.responsive.js']
};

gulp.task('uglify', function() {
	return gulp.src(paths.scripts)
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['uglify']);
});

gulp.task('default', ['uglify']);