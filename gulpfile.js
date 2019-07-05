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
const jsImport = require('gulp-js-import');

const mandelbrot = require('@frctl/mandelbrot');
const fractal = require('@frctl/fractal').create();
const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

const { buildSites, releaseSites } = require('./sites.building');

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
        color: '#d4ff26'
    },
    ready: {
        label: "Klar",
        description: "Redo att implementeras",
        color: "green"
    },
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

function tmp_build_scss(cb) {
    gulp.src('sites/tmp/tmp.scss')
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

// *****************
// *** Driftinfo ***
// *****************
function driftinfo_build_js(cb) {
    var src = [
       'components/Organism/rh-table/rh-table.js', 
       'components/Organism/rh-search/rh-search.js'
    ];
    gulp.src(src)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename(function (path) {
            console.log(path);
            var p = path.dirname.split('/');
            path.dirname = 'components/' + p[p.length -1];
        }))
        .pipe(concat('driftinfo.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(fractal.web.get('static.path') + '/js/'));

    logger.success('Kompilerade komponent JS');
    cb();
}
function driftinfo_build_scss(cb) {
    gulp.src('sites/driftinfo/driftinfo.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass.sync({
                outputStyle: 'compressed',
            })
            .on('error', sass.logError)
        )
        .pipe(concat('driftinfo.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(fractal.web.get('static.path') + '/css/'));

    logger.success('Kompilerade komponent SCSS');
    cb();
}
function driftinfo_release(cb) {

    driftinfo_build_scss(cb);
    driftinfo_build_js(cb);
    
    gulp.src('./public/css/driftinfo.css')
        .pipe(rename("driftinfo."+project.version_driftinfo+".css"))
        .pipe(gulp.dest('./releases/driftinfo'))

    gulp.src('./public/js/driftinfo.js')
        .pipe(rename("driftinfo."+project.version_driftinfo+".js"))
        .pipe(gulp.dest('./releases/driftinfo'))

    logger.success('Version ' + project.version_driftinfo + ' vänter på dig i /releases/! 👏👏👏')

    cb();
}

// **********************
// *** Region Halland ***
// **********************
function regionhalland_build_js(cb) {
    var src = [
       'components/Organism/rh-table/rh-table.js', 
       'components/Organism/rh-search/rh-search.js'
    ];
    gulp.src(src)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename(function (path) {
            console.log(path);
            var p = path.dirname.split('/');
            path.dirname = 'components/' + p[p.length -1];
        }))
        .pipe(concat('regionhalland.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(fractal.web.get('static.path') + '/js/'));

    logger.success('Kompilerade komponent JS');
    cb();
}
function regionhalland_build_scss(cb) {
    gulp.src('sites/regionhalland/regionhalland.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass.sync({
                outputStyle: 'compressed',
            })
            .on('error', sass.logError)
        )
        .pipe(concat('regionhalland.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(fractal.web.get('static.path') + '/css/'));

    logger.success('Kompilerade komponent SCSS');
    cb();
}
function regionhalland_release(cb) {

    regionhalland_build_scss(cb);
    regionhalland_build_js(cb);
    
    gulp.src('./public/css/regionhalland.css')
        .pipe(rename("regionhalland."+project.version_regionhalland+".css"))
        .pipe(gulp.dest('./releases/regionhalland'))

    gulp.src('./public/js/regionhalland.js')
        .pipe(rename("regionhalland."+project.version_regionhalland+".js"))
        .pipe(gulp.dest('./releases/regionhalland'))

    logger.success('Version ' + project.version_regionhalland + ' vänter på dig i /releases/! 👏👏👏')

    cb();
}

// **********************
// *** Musikhallandia ***
// **********************
function musikhallandia_build_js(cb) {
    var src = [
       'components/Organism/rh-table/rh-table.js', 
       'components/Organism/rh-search/rh-search.js'
    ];
    gulp.src(src)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename(function (path) {
            console.log(path);
            var p = path.dirname.split('/');
            path.dirname = 'components/' + p[p.length -1];
        }))
        .pipe(concat('musikhallandia.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(fractal.web.get('static.path') + '/js/'));

    logger.success('Kompilerade komponent JS');
    cb();
}
function musikhallandia_build_scss(cb) {
    gulp.src('sites/musikhallandia/musikhallandia.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass.sync({
                outputStyle: 'compressed',
            })
            .on('error', sass.logError)
        )
        .pipe(concat('musikhallandia.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(fractal.web.get('static.path') + '/css/'));

    logger.success('Kompilerade komponent SCSS');
    cb();
}
function musikhallandia_release(cb) {

    musikhallandia_build_scss(cb);
    musikhallandia_build_js(cb);
    
    gulp.src('./public/css/musikhallandia.css')
        .pipe(rename("musikhallandia."+project.version_musikhallandia+".css"))
        .pipe(gulp.dest('./releases/musikhallandia'))

    gulp.src('./public/js/musikhallandia.js')
        .pipe(rename("musikhallandia."+project.version_musikhallandia+".js"))
        .pipe(gulp.dest('./releases/musikhallandia'))

    logger.success('Version ' + project.version_musikhallandia + ' vänter på dig i /releases/! 👏👏👏')

    cb();
}

// ***********************
// *** Vårdgivarwebben ***
// ***********************
function vardgivare_build_js(cb) {
    var src = [
       'components/Organism/rh-table/rh-table.js', 
       'components/Organism/rh-search/rh-search.js'
    ];
    gulp.src(src)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename(function (path) {
            console.log(path);
            var p = path.dirname.split('/');
            path.dirname = 'components/' + p[p.length -1];
        }))
        .pipe(concat('vardgivare.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(fractal.web.get('static.path') + '/js/'));

    logger.success('Kompilerade komponent JS');
    cb();
}
function vardgivare_build_scss(cb) {
    gulp.src('sites/vardgivare/vardgivare.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass.sync({
                outputStyle: 'compressed',
            })
            .on('error', sass.logError)
        )
        .pipe(concat('vardgivare.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(fractal.web.get('static.path') + '/css/'));

    logger.success('Kompilerade komponent SCSS');
    cb();
}
function vardgivare_release(cb) {

    vardgivare_build_scss(cb);
    vardgivare_build_js(cb);
    
    gulp.src('./public/css/vardgivare.css')
        .pipe(rename("vardgivare."+project.version_vardgivare+".css"))
        .pipe(gulp.dest('./releases/vardgivare'))

    gulp.src('./public/js/vardgivare.js')
        .pipe(rename("vardgivare."+project.version_vardgivare+".js"))
        .pipe(gulp.dest('./releases/vardgivare'))

    logger.success('Version ' + project.version_vardgivare + ' vänter på dig i /releases/! 👏👏👏')

    cb();
}

// ******************
// *** Vuxhalland ***
// ******************
function vuxhalland_build_js(cb) {
    var src = [
       'components/Organism/rh-table/rh-table.js', 
       'components/Organism/rh-search/rh-search.js'
    ];
    gulp.src(src)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename(function (path) {
            console.log(path);
            var p = path.dirname.split('/');
            path.dirname = 'components/' + p[p.length -1];
        }))
        .pipe(concat('vuxhalland.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(fractal.web.get('static.path') + '/js/'));

    logger.success('Kompilerade komponent JS');
    cb();
}
function vuxhalland_build_scss(cb) {
    gulp.src('sites/vuxhalland/vuxhalland.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass.sync({
                outputStyle: 'compressed',
            })
            .on('error', sass.logError)
        )
        .pipe(concat('vuxhalland.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(fractal.web.get('static.path') + '/css/'));

    logger.success('Kompilerade komponent SCSS');
    cb();
}
function vuxhalland_release(cb) {

    vuxhalland_build_scss(cb);
    vuxhalland_build_js(cb);
    
    gulp.src('./public/css/vuxhalland.css')
        .pipe(rename("vuxhalland."+project.version_vuxhalland+".css"))
        .pipe(gulp.dest('./releases/vuxhalland'))

    gulp.src('./public/js/vuxhalland.js')
        .pipe(rename("vuxhalland."+project.version_vuxhalland+".js"))
        .pipe(gulp.dest('./releases/vuxhalland'))

    logger.success('Version ' + project.version_vuxhalland + ' vänter på dig i /releases/! 👏👏👏')

    cb();
}

// Tmp
exports.tmp_build = series(tmp_build_scss);

// Driftinfo
exports.driftinfo_build = series(driftinfo_build_scss, driftinfo_build_js);
exports.driftinfo_release = series(driftinfo_release);

// Musikhallandia
exports.musikhallandia_build = series(musikhallandia_build_scss, musikhallandia_build_js);
exports.musikhallandia_release = series(musikhallandia_release);

// Region Halland
exports.regionhalland_build = series(regionhalland_build_scss, regionhalland_build_js);
exports.regionhalland_release = series(regionhalland_release);

// Vardgivarwebben
exports.vardgivare_build = series(vardgivare_build_scss, vardgivare_build_js);
exports.vardgivare_release = series(vardgivare_release);

// Vuxhalland
exports.vuxhalland_build = series(vuxhalland_build_scss, vuxhalland_build_js);
exports.vuxhalland_release = series(vuxhalland_release);

// Main
exports.version = series(build, release);
exports.build = series(start, build);
exports.default = start;

// Sites building
exports.buildsites = buildSites;
exports.releasesites = releaseSites;
