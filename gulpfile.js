
const gulp = require('gulp'),
    zip = require('gulp-zip'),
    upload = require('webstore-upload'),
	credentials = require('./credentials.json');

const appId = 'phmpdjdaaenhgojfhacckdjpomnopkoh';

var options = {
    accounts:{
        default:{
            client_id: credentials.clientId,
            client_secret: credentials.clientSecret,
            refresh_token: credentials.refreshToken
        }
    },
    extensions:{
        unit4: {
            appID: appId,
            zip: "dist/archive.zip",
            publish: true
        }
    },
    uploadExtensions: ['unit4']
};

gulp.task('zip-files', () =>
    gulp.src('src/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('dist'))

);

gulp.task('publish', ['zip-files'], callback => {
        upload(options, 'default')
        .then(result => console.log(result))
        .catch(error => console.error(error));
});

gulp.task('default', ['zip-files', 'publish']);

