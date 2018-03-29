/**
 * @fileoverview
 *
 * This is the main gulpfile
 *
 * It compiles the SCSS code into CSS and adds vendor prefixes
 *
 * Created by maze on 12/8/16.
 */


const bootstrap = require.resolve('bootstrap/package.json');
const gulp = require('gulp');
const path = require('path');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sassDash = require.resolve('sassdash/package.json');


/**
 * Gulp-related configuration values.
 */
const conf = {
    dest: 'css',
    src: 'scss'
};

/**
 * Plugins-related configuration values.
 */
const opts = {
    prefix: {
        browsers: 'last 10 versions'
    },

    scss: {
        includePaths: [
            bootstrap,
            sassDash
        ].map(lib => path.join(path.dirname(lib), 'scss')),

        indentWidth: 4,
        outputStyle: 'expanded'
    }
};

/**
 * Compiles SCSS files to CSS and adds vendor prefixes.
 */
gulp.task('compile', () =>
    gulp.src(`${ conf.src }/**/*.scss`)
        .pipe(sass(opts.scss))
        .pipe(prefix(opts.prefix))
        .pipe(gulp.dest(conf.dest))
);

/**
 * Watches SCSS for compilation.
 */
gulp.task('watch', () =>
    gulp.watch(`${ conf.src }/**/*.scss`, gulp.task('compile'))
);

/**
 * Default task is to watch.
 */
gulp.task('default', gulp.task('watch'));
