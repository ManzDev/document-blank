// GULP
// gulpfile.js for development tasks
// Created by Manz ( https://www.emezeta.com/ )

var gulp = require('gulp');                     // Gulp tasker

// Javascript-related
var browserify = require('browserify');         // Browserify
var source = require('vinyl-source-stream');    // Streams vinyl (Bundle)
var buffer = require('vinyl-buffer');           // Buffers vinyl (Uglify)
var babelify = require('babelify');             // ES201x (ES8,ES7,ES6) => ES5
var uglify = require('gulp-uglify');            // Uglify Minification JS

// CSS-related
var less = require('gulp-less');                // LESS => CSS
var postcss = require('gulp-postcss');          // PostCSS core
var autoprefixer = require('autoprefixer');     // Plugin: autoprefixer
var cleancss = require('gulp-clean-css');       // Uglify Minification CSS

// Image or file-related
var imagemin = require('gulp-imagemin');        // Optimize (JPG/GIF/PNG/SVG)
var newer = require('gulp-newer');              // Generate only modified files
var concat = require('gulp-concat');            // Concatenate files
var rename = require('gulp-rename');            // Rename files
var del = require('del');                       // Clean tasks

// Others
var watch = require('gulp-watch');              // Change monitor
var webserver = require('gulp-webserver');      // Local server for development

// ==== OPTIONS ====

var options = {
    browserify: {
        entries: ['src/js/main.js'],        // JS Entry point
        cache: {},
        packageCache: {},
        transform: [['babelify', {          // Apply Babel
            presets: 'es2015'
        }]],
    },
    postcss: [autoprefixer],                // Autoprefixer for CSS
    imagemin: {
        interlaced: true,
        progressive: true,
        optimizationLevel: 9,
        svgoPlugins: [{ removeViewBox: true }]
    },
    webserver: {
        fallback: 'index.html',
        livereload: true,
        directoryListing: false,
        open: true,
        port: 80
    },
    uglifyjs: {
        mangle: false
    }
};

// ==== TASKS ====

// Default task
gulp.task('default', ['html', 'js', 'www']);

// Clean files
gulp.task('clean', () => {
    return del(['dist/js/*.js', 'dist/css/*.css', 'dist/img/*']);
});

// Javascript tasks
gulp.task('js', () => {
    console.log('Regenerando bundle...');
    return browserify(options.browserify).bundle()
        .on('error', err => console.error('[E] ' + err))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(buffer())
        .pipe(uglify(options.uglifyjs))
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('dist/js'));
});

// JS libraries tasks
gulp.task('libs', () => {
    return gulp.src('src/libs/*.js')
         .pipe(newer('dist'))
         .pipe(concat('libs.js'))
         .pipe(gulp.dest('dist/js'))
         .pipe(rename('libs.min.js'))
         .pipe(uglify(options.uglifyjs))
         .pipe(gulp.dest('dist/js'));
});

// CSS tasks
gulp.task('css', () => {
    return gulp.src('src/css/index.less')
        .pipe(less())
        .pipe(postcss(options.postcss))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleancss())
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest('dist/css'));
});

// Image tasks
gulp.task('images', () => {
    return gulp.src('src/img/**/*')
        .pipe(newer('dist/img'))
        .pipe(imagemin(options.imagemin))
        .pipe(gulp.dest('dist/img'));
});

// HTML tasks
gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(newer('dist'))
        .pipe(gulp.dest('dist'));
});

// static assets tasks
gulp.task('assets', () => {
    return gulp.src(['src/assets/*.mp3'])
        .pipe(newer('dist'))
        .pipe(gulp.dest('dist/assets'));
});

// Local server tasks
gulp.task('www', () => {
    gulp.src('dist')
        .pipe(webserver(options.webserver));
});

// Watching tasks
gulp.task('watch', ['watch-html', 'watch-css', 'watch-js', 'www']);
gulp.task('watch-html', () => gulp.watch('src/*.html', ['html']));
gulp.task('watch-css', ()  => gulp.watch('src/css/**/*.less', ['css']));
gulp.task('watch-js', ()   => gulp.watch('src/js/**/*.js', ['libs', 'js']));
