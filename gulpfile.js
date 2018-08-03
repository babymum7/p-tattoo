const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('serve', () => {
    gulp.src('./src/scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/assets/css'))
});

gulp.task('watch', ['serve'], () => {
    gulp.watch('./src/scss/**/*.scss', ['serve']);
});

gulp.task('default', ['watch']);