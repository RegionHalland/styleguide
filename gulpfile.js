'use strict';

const gulp = require('gulp');
const {task, series, parallel, watch } = require('gulp');
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

const rh_theme = mandelbrot({
    skin: "blue",
    styles: [
        "https://use.typekit.net/vip6kss.css",
        "/theme/css/theme.css"
    ],
    scripts: [
        'default',
        'https://unpkg.com/feather-icons',
        '/theme/js/theme.js'
    ]
    // any other theme configuration values here
});

rh_theme.addLoadPath(__dirname + '/assets/theme/views/');


fractal.set('project.title', 'Stilguide - Region Halland');

fractal.components.set('path', `${__dirname}/components`);
fractal.components.set('default.collated', false);
fractal.components.set('default.prefix', 'rh-'); // default is null
fractal.components.set('default.status', 'wip');

fractal.docs.set('path', `${__dirname}/docs`);

fractal.web.set('static.path', `${__dirname}/public`);
fractal.web.set('builder.dest', `${__dirname}/build`);
fractal.web.theme(rh_theme);

function start(cb) {

    gulp.watch('components/**/*', parallel(scss, images, js));
    gulp.watch('assets/**/*', theme);

    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });

    cb();
}


function theme(cb) {

    gulp.src('assets/scss/**/*.scss')
		.pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['node_modules']
        }))
        .pipe(
			sass.sync({
				outputStyle: 'compressed'
  			})
			.on('error', sass.logError)
		)
        .pipe(concat('theme.css'))
		.pipe(sourcemaps.write())
  		.pipe(gulp.dest(fractal.web.get('static.path') + '/theme/css/'));

    gulp.src('./assets/img/**/*')
        .pipe(gulp.dest(fractal.web.get('static.path') + '/theme/img/'));

    gulp.src('./assets/js/**/*')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('theme.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(fractal.web.get('static.path') + '/theme/js/'));

    logger.success('Byggde temat');
    	cb();

}


function release(cb) {

    images(cb);
    scss(cb);
    js(cb);

    gulp.src('./public/images/components/**/*')
        .pipe(gulp.dest('./releases/' + project.version + '/images/components'));


    gulp.src('./public/css/components.css')
        .pipe(gulp.dest('./releases/' + project.version + '/css'))


    gulp.src('./public/js/components.js')
        .pipe(gulp.dest('./releases/' + project.version + '/js'))


    logger.success('Version ' + project.version + ' vänter på dig i /releases/! 👏👏👏')

    cb();
}

function scss(cb) {
 	gulp.src('components/**/*.scss')
		.pipe(sourcemaps.init())
  		.pipe(
			sass.sync({
				outputStyle: 'compressed',
  			})
			.on('error', sass.logError)
		)
        .pipe(concat('components.css'))
		.pipe(sourcemaps.write())
  		.pipe(gulp.dest(fractal.web.get('static.path') + '/css/'));

    logger.success('Kompilerade komponent SCSS');
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

    logger.success('Optimerade komponent bilder');
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

    logger.success('Kompilerade komponent JS');
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

exports.version = series(build, release);
exports.build = series(start, build);
exports.default = start;
