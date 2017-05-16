
var gulp = require('gulp'),
    zip = require('gulp-zip');


gulp.task('zip-files', () =>
    gulp.src('src/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('dist'))

);

gulp.task('default', ['zip-files']);

