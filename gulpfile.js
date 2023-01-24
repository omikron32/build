var gulp        = require('gulp');
    sass        = require('gulp-sass')(require('sass'));
    prefixer    = require('gulp-autoprefixer');
    browsersync = require('browser-sync');
    cleancss	= require('gulp-clean-css');
    sourcemaps	= require('gulp-sourcemaps');
    webp        = require('gulp-webp');

gulp.task('sass', function(){
    return gulp.src('src/style/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer(['last 4 versions']))
        .pipe(cleancss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'))
        .pipe(browsersync.reload({stream: true}))
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
        .pipe(browsersync.reload({ stream: true }))
});

gulp.task('images', function() {
    return gulp.src('src/img/*.jpg')
        .pipe(gulp.dest('build/img'))
        .pipe(browsersync.reload({ stream: true }))
});

gulp.task('towebp', function () {
    return gulp.src('src/img/*.* ')
        .pipe(webp())
        .pipe(gulp.dest('build/img'))
});

gulp.task('watch', function() {
    gulp.watch('src/style/**/*.scss', gulp.parallel('sass'));
    gulp.watch('src/*.html', gulp.parallel('html'));
    gulp.watch('src/img/*.jpg', gulp.parallel('images'));
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browsersync({
        server: {
            baseDir: 'build'
        },
        notify: false
    });
});

exports.browsersync = browsersync;

gulp.task('default', gulp.parallel('watch'));

gulp.task('gulp-sync', gulp.parallel('sass', 'html', 'images', 'browser-sync', 'watch'));