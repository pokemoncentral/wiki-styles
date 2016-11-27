# wiki-styles
Pokémon Central Wiki CSS styles, refactored in SCSS language.

## General info
This started as a refactoring of the original [Common.css](https://wiki.pokemoncentral.it/index.php?title=MediaWiki:Common.css&oldid=482017): it was getting huge and messy; moreover, writing plain old CSS is a pain. In addition to that, thanks to SCSS superpowers, with a couple of loops we added classes for solid colors and gradients, and, last but not least flexbox styles from a specific extension have been merged here.

## Technical info
This is a [Compass](http://compass-style.org/) project, featuring an import scheme based on an _all.scss file for each sub-directory, to minimize git conflicts. A bunch of data-related libraries have been installed, and all dependencies are handled by [bundler](https://bundler.io/).

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
2. Open a root/administrator shell launch `gem install bundler`.
3. Move in the project main directory and merrily get all the dependencies with `bundle install`.

