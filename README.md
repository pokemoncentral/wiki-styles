# wiki-styles
Pokémon Central Wiki CSS styles, refactored in SCSS language.

## General info
This started as a refactoring of the original [Common.css](https://wiki.pokemoncentral.it/index.php?title=MediaWiki:Common.css&oldid=482017):
it was getting huge and messy; moreover, writing plain old CSS is a pain.
In addition to that, flexbox styles from a specific extension have been merged
here.

## Technical info
The build process is powered by [gulp v4](https://github.com/gulpjs/gulp/tree/4.0).
However, the inclusion of files is SCSS based, and the import scheme is based
on an `_all.scss` file located in each sub-directory, that in turn imports all
the files in the directory. This was chosen in order to minimize git conflicts.

## Setup
1. [Install Node.js](https://nodejs.org/en/download/current/) environment for
    your operating system.
5. Open a root/administrator shell and launch `npm install gulpjs/gulp-cli -g`
3. Move in the project main directory and happily download all the dependencies
    with `npm install`.

### Libraries
* [Bootstrap](https://getbootstrap.com/)
* [Sassdash](https://github.com/davidkpiano/sassdash)

### Useful links
* [SCSS syntax and language](http://sass-lang.com/documentation/file.SASS_REFERENCE.html).
* [SCSS built-in functions](http://sass-lang.com/documentation/Sass/Script/Functions.html).
* [Bootstrap documentation](https://getbootstrap.com/docs/4.0/getting-started/introduction/).
* [Sassdash documentation](https://github.com/davidkpiano/sassdash).
