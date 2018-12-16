/**
 * @fileoverview
 *
 * This is the main gulpfile
 *
 * Its overall task is to compile SCSS to CSS, but other minor ones are
 * implied by this.
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

    /*
        The icons list is taken from the SCSS file. It is much easier than
        taking it from JavaScript in SCSS.
    */
    icons: fs.readFileSync(path.join('scss', 'variables', '_icons.scss'),
                {encoding: 'UTF-8'})
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
 * Compiles SCSS files to CSS. In orded to do this, it needs to inline icons
 * and to add vendor prefixes after compilation.
 */
gulp.task('compile', gulp.series('icons', () =>
    gulp.src(`${ conf.src }/**/*.scss`)
        .pipe(sass(opts.scss).on('error', sass.logError))
        .pipe(prefix())
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
