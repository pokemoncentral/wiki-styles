/**
 * @fileoverview
 *
 * This is the main gulp file.
 *
 * By now, it just handles CSS vendor prefixing
 *
 * Created by maze on 12/8/16.
 */

const autoprefixer = require('gulp-autoprefixer');
const gulp = require('gulp');
const path = require('path');

/**
 * Configurable values.
 */
const conf = {
    paths: {
        cssBase: 'css',
        clean: 'clean',
        prefixed: 'prefixed'
    }
};

conf.src = {
    cleanCss: path.join(conf.paths.cssBase, conf.paths.clean, '*.css')
};

conf.dest = {
    prefixedCss: path.join(conf.paths.cssBase, conf.paths.prefixed)
};

/**
 * Plugins options.
 */
const opts = {
    autoprefixer: {
        remove: false
    }
};

/**
 * This task adds CSS vendor prefixes.
 */
gulp.task('prefix', () => {
    return gulp.src(conf.src.cleanCss)
        .pipe(autoprefixer(opts.autoprefixer))
        .pipe(gulp.dest(conf.dest.prefixedCss));
});

/**
 * Watches for CSS files to be prefixed.
 */
gulp.task('watch', () => {
    gulp.watch(conf.src.cleanCss, 'prefix');
});

/**
 * Default task to watch.
 */
gulp.task('default', gulp.task('watch'));
