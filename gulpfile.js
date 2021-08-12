const { src, dest, series, watch, parallel } = require('gulp');

const removeCommentsCss = require('gulp-strip-css-comments');
const autoprefixer      = require('gulp-autoprefixer');
const cleanCSS          = require('gulp-clean-css');
const sass              = require('gulp-sass')(require('sass'));
const include           = require('gulp-file-include');
const del               = require('del');
const concat            = require('gulp-concat');
const sync              = require('browser-sync').create();


const html = () => {
    return src('./src/index.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(dest('./app'));
};


const scriptsDev = () => {
    return src("./src/js/**/*.js")
        .pipe(dest("./app/js"))
};


const scssDev = () => {
   return src('./src/scss/style.scss')
       .pipe(sass({
            outputStyle:'expanded'
        }))
       .pipe(concat('./css/style.css'))
       .pipe(dest('./app'));
};

const scssBuild = () => {
   return src('./src/scss/style.scss')
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(removeCommentsCss())
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(concat('./css/style.css'))
        .pipe(dest('./app'));
};


const clear = () => {
    return del('./app');
};


const serve = () => {
    sync.init({
        server: './app/'
    });

    watch('./src/index.html',			series(html)).on('change', sync.reload);
    watch("./src/js/**/*.js",	        series(scriptsDev)).on('change', sync.reload);
    watch('./src/scss/**/*.scss',		series(scssDev)).on('change', sync.reload);
};

exports.build = series(clear, parallel(scssBuild, html));
exports.serve = series(clear, parallel(scssDev, html, scriptsDev, serve));
