'use strict';


const gulp = require('gulp');
const { series, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

/*
 * Configure a Fractal instance.
 *
 * This configuration could also be done in a separate file, provided that this file
 * then imported the configured fractal instance from it to work with in your Gulp tasks.
 * i.e. const fractal = require('./my-fractal-config-file');
 */

const fractal = require('@frctl/fractal').create();

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


const mandelbrot = require('@frctl/mandelbrot'); // require the Mandelbrot theme module

// create a new instance with custom config options
const myCustomisedTheme = mandelbrot({
    skin: "blue",
    styles: [
        "default",
        "/css/skin.css"
    ]
    // any other theme configuration values here
});

fractal.web.theme(myCustomisedTheme);



// any other configuration or customisation here

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

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

    gulp.watch('components/**/*', scss);

    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });

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
  		.pipe(gulp.dest('./public/css/'));

    logger.success('Byggde CSS');
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


gulp.task('fractal:build', function(){

});

exports.build = build;
exports.default = start;
