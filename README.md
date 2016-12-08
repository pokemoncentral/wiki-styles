# wiki-styles
Pokémon Central Wiki CSS styles, refactored in SCSS language.

## General info
This started as a refactoring of the original [Common.css](https://wiki.pokemoncentral.it/index.php?title=MediaWiki:Common.css&oldid=482017): it was getting huge and messy; moreover, writing plain old CSS is a pain. In addition to that flexbox styles from a specific extension have been merged here.

## Technical info
This is a [Compass](http://compass-style.org/) project, featuring an import scheme based on an _all.scss file for each sub-directory, to minimize git conflicts. By now, there are no particular reasons for using Compass, but previously there were and it's pointless to change the whole setup now.

A bunch of SCSS data-related libraries have been installed, and all these dependencies are managed by [bundler](https://bundler.io/).

Vendor prefixes are handled by a combination of SASS mixin and [Autoprefixer](https://github.com/postcss/autoprefixer), because we needed some weird prefixes not managed by the latter. This eventually led to a double build/task system, Compass + [gulp](https://github.com/gulpjs/gulp/tree/4.0): more information in the [paragraph below](#markdown-header-Compass-vs-gulp).

### Compass vs gulp
While compass is the SCSS framework of our choice, gulp is necessary for autoprefixer, since it works way better from within it than in Ruby on Rails. To blend compass into gulp, there is [this tiny wrapper](https://github.com/appleboy/gulp-compass), which happens to have a fatal flaw: input and output can't be read from compass config.rb file, and must indeed be duplicated to gulp. Since we don't need to try the resulting styles in a browser immediately, it's worthless to have repeated code at the benefit of an unified build system.

### Libraries
All libraries are from [@import](https://github.com/at-import) repositories.
* [SassyLists](https://github.com/at-import/SassyLists) ([docs](https://at-import.github.io/SassyLists/documentation/)).
* [Sassy-Maps](https://github.com/at-import/Sassy-Maps) ([docs](https://github.com/at-import/Sassy-Maps#functions)).
* [Sassy-Strings](https://github.com/at-import/Sassy-Strings) ([docs](https://github.com/at-import/Sassy-Strings)).

### Useful links
* [SCSS syntax and language](http://sass-lang.com/documentation/file.SASS_REFERENCE.html).
* [SCSS built-in functions](http://sass-lang.com/documentation/Sass/Script/Functions.html).
* [Compass built-in functions](http://compass-style.org/index/functions/).
* [Compass built-in mixins](http://compass-style.org/index/mixins/).
* [Compass config globals](http://compass-style.org/index/variables/).

## Setup
1. [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/) language for your operating system.
2. Open a root/administrator shell and launch `gem install bundler`.
3. Move in the project main directory and merrily get all SCSS dependencies with `bundle install`.
4. [Install Node.js](https://nodejs.org/en/download/current/) environment for your operating system.
5. Open a root/administrator shell and launch `npm install gulpjs/gulp-cli -g`
3. Move in the project main directory and happily download all JS dependencies with `npm install`.
