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
const gulp = require('gulp');
const icons = require('./json/icons.json');
const jsonImporter = require('node-sass-json-importer');
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

    icons: icons.map(icon => {
        const iconName = icon.iconName || icon.id.toLowerCase();
        const baseUrl = icon.baseUrl
            ? icon.baseUrl.match("'?([^']+)'?")[1]
            : 'https://media.pokemoncentral.it/social/';
        return `${ baseUrl }/${ iconName }.svg`;
    }),

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
        base: null
    },

    scss: {
        importer: jsonImporter(),

        includePaths: [
            bootstrap,
            sassDash
        ].map(lib => path.join(path.dirname(lib), 'scss'))
        .concat([`${ __dirname }/json`]),

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
