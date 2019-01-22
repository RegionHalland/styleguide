'use strict';


const gulp = require('gulp');
const { series, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const image = require('gulp-image');
const project = require('./package.json');
const rename = require("gulp-rename");
const babel = require('gulp-babel');


const mandelbrot = require('@frctl/mandelbrot');
const fractal = require('@frctl/fractal').create();
const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

const myCustomisedTheme = mandelbrot({
    skin: "blue",
    styles: [
        "default",
        "/css/skin.css"
    ]
    // any other theme configuration values here
});
/*
 * Configure a Fractal instance.
 *
 * This configuration could also be done in a separate file, provided that this file
 * then imported the configured fractal instance from it to work with in your Gulp tasks.
 * i.e. const fractal = require('./my-fractal-config-file');
 */


fractal.set('project.title', 'Stilguide - Region Halland');
fractal.set('project.title', 'Stilguide - Region Halland');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', `${__dirname}/components`);
fractal.components.set('default.collated', false);
fractal.components.set('default.prefix', 'rh-'); // default is null
fractal.components.set('default.status', 'wip');
/*
 * Tell Fractal where to look for documentation pages.
 */
 fractal.docs.set('path', `${__dirname}/docs`);

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', `${__dirname}/public`);
fractal.web.set('builder.dest', `${__dirname}/build`);

 // require the Mandelbrot theme module

// create a new instance with custom config options


fractal.web.theme(myCustomisedTheme);



// any other configuration or customisation here


/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */


function start(cb) {

    gulp.watch('components/**/*', parallel(scss, images, js));

    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });

    cb();
}

function release_images(cb) {
    // TODO: hämta alla bilder som komponenterna använder och optimera dem + lägg dem i releases mappen
    cb();
}

function release_css(cb) {

    scss(cb);


    gulp.src('./public/css/components.css')
        .pipe(gulp.dest('./releases/' + project.version))

    // TODO: hämta components.css och lägg i releases mappen
    cb();
}

function release_js(cb) {
    // TODO: hämta komponenternas JS och minifiera, concatenera och lägg i releases mappen
    cb();
}

function scss(cb) {
 	gulp.src('components/**/*.scss')
		.pipe(sourcemaps.init())
  		.pipe(
			sass.sync({
				outputStyle: 'compressed'
  			})
			.on('error', sass.logError)
		)
        .pipe(concat('components.css'))
		.pipe(sourcemaps.write())
  		.pipe(gulp.dest(fractal.web.get('static.path') + '/css/'));

    logger.success('Byggde CSS');
	cb();
}


function images(cb) {
 	gulp.src('components/**/*.{svg,png,gif,jpg}')
        .pipe(image())
        .pipe(rename(function (path) {
            var p = path.dirname.split('/');
            path.dirname = 'components/' + p[p.length -1];
        }))
  		.pipe(gulp.dest(fractal.web.get('static.path') + '/images/'));

    logger.success('Optimerade bilder');
	cb();
}

function js(cb) {
 	gulp.src('components/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename(function (path) {
            console.log(path);
            var p = path.dirname.split('/');
            path.dirname = 'components/' + p[p.length -1];
        }))
        .pipe(concat('components.js'))
        .pipe(sourcemaps.write('.'))
  		.pipe(gulp.dest(fractal.web.get('static.path') + '/js/'));

    logger.success('Byggde component js');
	cb();
}



function build(cb) {
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
    cb();
}


gulp.task('version', function(cb){

    cb();
});

exports.version = parallel(release_css, release_images, release_js);
exports.build = build;
exports.default = start;
