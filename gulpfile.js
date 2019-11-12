'use strict';

const gulp = require('gulp');
const { series, parallel, watch, src, dest, task } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const image = require('gulp-image');
const project = require('./package.json');
const rename = require("gulp-rename");
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

const mandelbrot = require('@frctl/mandelbrot');
const fractal = require('@frctl/fractal').create();
const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

const { buildSites, releaseSites, getOptionsHelper } = require('./sites.building');

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
fractal.components.set('default.prefix', ''); // default is null
fractal.components.set('default.status', 'wip');

fractal.docs.set('path', `${__dirname}/docs`);

fractal.web.set('static.path', `${__dirname}/public`);
fractal.web.set('builder.dest', `${__dirname}/build`);
fractal.web.theme(rh_theme);

fractal.components.set('statuses', {
    prototype: {
        label: "Skiss",
        description: "Tidig prototyp. Implementera inte.",
        color: '#F00'
    },
    wip: {
        label: "Under utveckling",
        description: "Under utveckling. Avvakta med att implementera.",
        color: 'orange'
    },
    review: {
        label: "Under granskning",
        description: "Granskas för godkännande. Implementera med försiktighet.",
        color: '#4b7070'
    },
    ready: {
        label: "Klar",
        description: "Redo att implementeras",
        color: "green"
    },
    eol: {
        label: "Fasas ut - end of life",
        description: "Denna komponent kommer raderas i framtiden",
        color: 'black'
    },
    rework: {
        label: "Inväntar ombyggnad",
        description: "Kommer att göras om",
        color: '#ff47d3'
    }
});

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
 	gulp.src('components/scss/main.scss')
		.pipe(sourcemaps.init())
  		.pipe(
			sass.sync({
				outputStyle: 'compressed',
  			})
			.on('error', sass.logError)
		)
        .pipe(concat('components.css'))
		.pipe(sourcemaps.write('.'))
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

function tmpBuildScss(cb) {
    gulp.src('tmp/tmp.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass.sync({
                outputStyle: 'compressed',
            })
            .on('error', sass.logError)
        )
        .pipe(concat('tmp.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(fractal.web.get('static.path') + '/css/'));

    logger.success('Kompilerade komponent SCSS');
    cb();
}

// [Experiment feature] DevServe
function devServe(cb) {
    getOptionsHelper("-r", "--recompile") ?
        (series(scss, images, js)()) : // ONLY recompiling
        devServer(cb); // Starting development server

    cb();
}

function devServer(cb) {
    const devServeConfig = {
        "fractalServer": {
            "port": 3010
        },
        "localServer": {
            "port": 3000
        }
    }

    // Fractal server
    const server = fractal.web.server({
        port: devServeConfig.fractalServer.port,
        sync: false, // BrowserSync takes care about reloading
        watch: true
    });

    server.on('error', (err) => console.error(err.message));
    server.start().then(function(){
        console.log(`Fractal server is now running at ${server.url}`);
    });

    // BrowserSync server
    browserSync.init({
        proxy: 'http://localhost:' + devServeConfig.fractalServer.port, // Fractal server
        browser: "chrome",
        port: devServeConfig.localServer.port, // BrowserSync server
        open: false,
        notify: false,
        scrollThrottle: 100,
        reloadThrottle: 250,
        watchOptions: {
            ignoreInitial: true,
            ignored: /node_modules|build|cdn|docs|releases|tmp|vendor/
        }
    });

    // Gulp watching
    watch('components/**/*.scss', scssCompilation); // Watching SCSS files for CSS injecting
    watch(['components/**/*.{hbs,json,md}', 'docs/**/*.md']).on('change', browserSync.reload);
    watch('components/**/*.js').on('change', series(js, reloadPage));
    watch('components/**/*.{svg,png,gif,jpg}').on('all', series(images, reloadPage));

    cb();
}

function reloadPage(cb){
    browserSync.reload();
    cb();
}

function scssCompilation(cb) {
    const cssDesPath = fractal.web.get('static.path') + '/css/';

    src('components/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()
            //.sync({ outputStyle: 'compressed' })
            //.on('error', sass.logError)
        )
        .pipe(concat('components.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(cssDesPath))
        .pipe(browserSync.stream({ match: "**/*.css" }));

    cb();
}
// End of DevServe

// Main
exports.version = series(build, release);
exports.build = series(start, build);
exports.default = start;

// Tmp
exports.tmp = tmpBuildScss;

// Sites building
exports.builds = buildSites;
exports.releases = releaseSites;

// DevServe
exports.dev = devServe;