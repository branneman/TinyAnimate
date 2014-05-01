var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default', function() {

    gulp.src(__dirname + '/src/*.js')
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('bin'))

});