
const gulp = require('gulp'),
    zip = require('gulp-zip'),
    fs = require('fs'),
	credentials = require('./credentials.js');

const webstore = require('chrome-webstore-upload')({
    extensionId: 'phmpdjdaaenhgojfhacckdjpomnopkoh',
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    refreshToken: credentials.refreshToken
});

var token = undefined;


gulp.task('zip-files', () =>
    gulp.src('src/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('dist'))

);

gulp.task('fetch-token', callback => webstore.fetchToken().then(retrievedToken => {
        token = retrievedToken;
        callback();
    })
);

gulp.task('upload', callback => {
    const zipFile = fs.createReadStream('./dist/archive.zip');

    webStore.uploadExisting(zipFile, token)
        .then(resource => callback())
});

gulp.task('publish', callback => webstore.publish('default', token).then(resource => callback()));

gulp.task('default', ['zip-files', 'fetch-token', 'upload', 'publish']);

