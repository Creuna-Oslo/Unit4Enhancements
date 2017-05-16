
var gulp = require('gulp'),
    zip = require('gulp-zip'),
	credentials = require('./credentials.js');


gulp.task('zip-files', () =>
    gulp.src('src/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('dist'))

);

gulp.task('publish', () =>
    console.log(credentials.clientId)
    //https://www.npmjs.com/package/chrome-webstore-upload
);

gulp.task('default', ['zip-files', 'publish']);

