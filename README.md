A prepared package for new HTML/CSS/JS projects and easy coding.

## Features

- Allow use require (NodeJS) or import (ES6/ES2015) at now [ Browserify: http://browserify.org/ ]
- Allow write ES201x (ES8/ES7/ES6) Javascript at now [ Babel: https://babeljs.io/ ]
- Allow write LESS code for better organization [ LESS: http://lesscss.org/ ]
- Automatic optimization for JPG/PNG/GIF/SVG images [ Imagemin: https://github.com/imagemin/imagemin ]
- Review code for improve quality code, tips and avoid errors [ ESLint: https://eslint.org/ ]
- Automatic tasks and preprocess code when changes [ Gulp & plugins: https://gulpjs.com/ ]
- Minify JS code for production [ UglifyJS: https://github.com/mishoo/UglifyJS ]
- Minify CSS code for production [ CleanCSS: https://github.com/jakubpawlowicz/clean-css ]
- Postprocess CSS and add CSS prefixs [ PostCSS: http://postcss.org/ ]
- Includes a local webserver for development [ GWebserver/LiveReload: https://github.com/schickling/gulp-webserver ]

## Requisites

- Git https://git-scm.com/
- NodeJS/NPM https://nodejs.org/en/
- Gulp https://gulpjs.com/
- ATOM editor https://atom.io/ (*recommended*), with plugins
  - emmet https://atom.io/packages/emmet
  - atom-file-icons https://atom.io/packages/atom-file-icons
  - autocomplete-json https://atom.io/packages/autocomplete-json
  - autocomplete-modules https://atom.io/packages/autocomplete-modules
  - gulp-task-launcher https://atom.io/packages/gulp-task-launcher
  - minimap https://atom.io/packages/minimap
  - pigments https://atom.io/packages/pigments  
  - linter https://atom.io/packages/linter and dependencies
    - busy-signal https://atom.io/packages/busy-signal
    - intentions https://atom.io/packages/intentions
    - linter-ui-default https://atom.io/packages/linter-ui-default
  - linter-eslint https://atom.io/packages/linter-eslint
  - linter-less https://atom.io/packages/linter-less
  - linter-htmlhint https://atom.io/packages/linter-htmlhint

```
apt-get install git
npm install -g gulp less eslint babel
apm install emmet atom-file-icons autocomplete-json autocomplete-modules gulp-task-launcher minimap pigments
apm install linter busy-signal intentions linter-ui-default linter-eslint linter-less linter-htmlhint
```

## Folder structure

```
 |
 |- src                       ; Source files of project (for development)
     |-- assets               ; Static assets (MP3, PDF...)
     |-- css                  ; LESS (CSS) files
     |-- img                  ; Source images (PSD, PDN, JPG, PNG, SVG...)
     |-- js                   ; ES201x Javascript source files
     |-- libs                 ; JS Libraries (Lodash, Underscore, jQuery, etc...)
     |- index.html
 |- dist                      ; End files of project (for production)
     |-- css
     |-- js
     |- index.html
 |- .git
 |- .eslintrc.json            ; JSON ESlint Linter Config
 |- gulpfile.js               ; JS Tasks Gulp Config
 |- package.json              ; JSON NPM Package Config
```

* **Remember!** [Don't touch dist/](https://youtu.be/otCpCn0l4Wo?t=14) files. You should only edit files in src/ folder.

## Installation

```
git clone https://github.com/ManzDev/document-blank.git project-name
cd project-name
npm install
```

## Tasks (gulp)

With next commands you can generate end HTML, CSS and JS files.


### 1. Preprocess files

```
gulp html                   ; Copy HTML files to dist/
gulp css                    ; Preprocess LESS, PostCSS & plugins and minify with CleanCSS to dist/
gulp js                     ; Preprocess JS with Browserify, Babel and minify with UglifyJS to dist/
gulp libs                   ; Concatenate JS libraries and minify with UglifyJS to dist/
gulp html css js libs       ; Alias for prev tasks
gulp                        ; Alias for prev tasks
```

### 2. Process assets and images

```
gulp assets                 ; Process static files (only new files) to dist/
gulp images                 ; Process and optimize images (JPG, PNG, GIF, SVG...) to dist/
```

### 3. Monitorize changes and open local web server

```
gulp watch-html             ; Watch HTML and launch tasks if changes
gulp watch-css              ; Watch LESS and launch tasks if changes
gulp watch-js               ; Watch JS/ES6 and launch tasks if changes
gulp www                    ; Launch local web server
gulp watch                  ; Watch all prev tasks (and local web server)
```

## To do / Future improvements

- Change **Gulp webserver / Livereaload** to **Browser Sync** https://browsersync.io/
- Implement polyfill system for outdated browsers https://polyfill.io/v2/docs/
- Implement polyfill WHATWG Fetch for outdated browsers https://github.github.io/fetch/
