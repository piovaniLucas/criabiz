const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const del = require('del');
const merge = require('merge-stream');

const paths = {
    scss: './scss/**/*.scss',
    html: ['./*.html', './pages/**/*.html'],
    css: './css',
    dist: './dist'
};

function compileSass() {
    return gulp.src('./scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

function clean() {
    return del(['dist']);
}

function copy() {

    const html = gulp.src(['*.html','pages/**/*.html'], {base:'./'})
        .pipe(gulp.dest('dist'));

    const css = gulp.src('css/**/*',{base:'./'})
        .pipe(gulp.dest('dist'));

    const js = gulp.src('js/**/*',{base:'./'})
        .pipe(gulp.dest('dist'));

    const images = gulp.src('images/**/*',{base:'./'})
        .pipe(gulp.dest('dist'));

    const fonts = gulp.src('fonts/**/*',{base:'./'})
        .pipe(gulp.dest('dist'));

    const vendors = gulp.src('vendors/**/*',{base:'./'})
        .pipe(gulp.dest('dist'));

    return merge(html,css,js,images,fonts,vendors);
}

function serve() {

    browserSync.init({
        server: "./"
    });

    gulp.watch(paths.scss, compileSass);
    gulp.watch(paths.html).on('change', browserSync.reload);
}

exports.sass = compileSass;
exports.clean = clean;
exports.build = gulp.series(clean, compileSass, copy);
exports.default = serve;