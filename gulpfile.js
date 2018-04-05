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
const fs= require('fs');
const gulp = require('gulp');
const path = require('path');
const prefix = require('gulp-autoprefixer');
const remoteSrc = require('gulp-remote-src');
const sass = require('gulp-sass');
const sassInlineSvg = require('gulp-sass-inline-svg');
const sassDash = require.resolve('sassdash/package.json');
const svgmin = require('gulp-svgmin');

/**
 * Gulp-related configuration values.
 */
const conf = {
    dest: 'css',

    icons: fs.readFileSync('scss/variables/_icons.scss', {encoding: 'UTF-8'})
            .match(/\$icons: ([\w,\s]+);/)[1]
            .split(/,\s*/)
            .map(icon => icon.toLowerCase() + '.svg'),

    src: 'scss'
};

/**
 * Plugins-related configuration values.
 */
const opts = {
    icons: {
        destDir: `${ conf.src }/icons`
    },

    prefix: {
        browsers: 'last 10 versions'
    },

    remote: {
        base: 'https://media.pokemoncentral.it/social/'
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
 * Creates the inlined icons css files
 */
gulp.task('icons', () =>
    remoteSrc(conf.icons, opts.remote)
        .pipe(svgmin())
        .pipe(sassInlineSvg(opts.icons))
);


/**
 * Compiles SCSS files to CSS and adds vendor prefixes.
 */
gulp.task('compile', gulp.series('icons', () =>
    gulp.src(`${ conf.src }/**/*.scss`)
        .pipe(sass(opts.scss))
        .pipe(prefix(opts.prefix))
        .pipe(gulp.dest(conf.dest))
));


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
