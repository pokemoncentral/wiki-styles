# wiki-styles
Pokémon Central Wiki CSS styles, refactored in SCSS language.

## General info
This started as a refactoring of the original [Common.css](https://wiki.pokemoncentral.it/index.php?title=MediaWiki:Common.css&oldid=482017):
it was getting huge and messy; moreover, writing plain old CSS is a pain.
In addition to that, flexbox styles from a specific extension have been merged
here.

## Technical info

### Gulp
The build process is powered by [gulp v4](https://github.com/gulpjs/gulp/tree/4.0).
It consists of four main steps:

- Downloading some SVG icons.
- Inlining such SVG icons.
- Compiling SCSS to CSS.
- Adding vendor prefixes.

However, the actual tasks don't match these steps. In fact, it would not be
worth the effort to split the build process in this way, since the steps are
hardly ever executed individually.

#### Gulp tasks

There are two main tasks in the `gulpfile.js`, plus a `watch` and `default`
tasks that are mere aliases. These are:

- `icons`: This task downloads the SVG icons straight from Pokémon Central
    website, minifies them (even though I'm pretty sure this doesn't really
    reduce the size significantly), and finally inlines them in the SCSS. The
    output of the whole process is a couple of SCSS files in the `_icons`
    directory: the reason for this seemingly weird outcome is the use of
    [gulp-sass-inline-svg](https://www.npmjs.com/package/gulp-sass-inline-svg)
    plugin. It was chosen to split this task from the main `compile` one, as
    it operates on different inputs and produces other outputs: moreover,
    SCSS files should have been added later to the pipeline, as the plugin
    only handles SVG inputs.

- `compile`: This task carries out the main job: it produces the CSS files
    that can be loaded on Pokémon Central Wiki. This implies: executing the
    `icons` task; compiling SCSS files to CSS (including the output of
    `icons`); adding vendor prefixes. For more information on the SCSS
    compilation, read the **** section.

- `watch`: Watcher for `compile`: it executes `compile` whenever its inputs
    change.

- `default`: alias for `watch`.

### SCSS
However, the inclusion of files is SCSS based, and the import scheme is based
on an `_all.scss` file located in each sub-directory, that in turn imports all
the files in the directory. This was chosen in order to minimize git conflicts.

## Setup
1. [Install Node.js](https://nodejs.org/en/download/current/) environment for
    your operating system.
2. Open a root/administrator shell and launch `npm install gulpjs/gulp-cli -g`
3. Move in the project main directory and happily download all the dependencies
    with `npm install`.

### Libraries
- [Bootstrap](https://getbootstrap.com/)
- [Sassdash](https://github.com/davidkpiano/sassdash)

### Useful links
- [SCSS syntax and language](http://sass-lang.com/documentation/file.SASS_REFERENCE.html).
- [SCSS built-in functions](http://sass-lang.com/documentation/Sass/Script/Functions.html).
- [Bootstrap documentation](https://getbootstrap.com/docs/4.0/getting-started/introduction/).
- [Sassdash documentation](https://github.com/davidkpiano/sassdash).
