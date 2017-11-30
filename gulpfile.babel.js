'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import browsersync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import svgmin from 'gulp-svgmin';
import svgSprite from 'gulp-svg-sprite';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import docs from 'gulp-docs';


// Build CSS
gulp.task('css:dist', () => {
	// PostCSS plugins
	const plugins = [
		autoprefixer({browsers: ['last 1 version']}),
		cssnano()
	];
	return gulp.src('./src/scss/**/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss(plugins))
		.pipe(rename({suffix: '.min'}))
		.pipe(browsersync.stream())
		.pipe(sourcemaps.write())
		.pipe(plumber.stop())
		.pipe(gulp.dest('./dist/css/'));
});


// Build temporary CSS 
gulp.task('css:dev', () => {
	// PostCSS plugins
	const plugins = [
		autoprefixer({browsers: ['last 1 version']}),
		cssnano()
	];
	return gulp.src('./src/scss/**/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss(plugins))
		.pipe(gulp.dest('./temp/css/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(browsersync.stream())
		.pipe(sourcemaps.write())
		.pipe(plumber.stop())
		.pipe(gulp.dest('./temp/css/'));
});

// Build JS
gulp.task('js:dist', () => {
	gulp.src('./src/js/**/*.js')
		.pipe(plumber())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(plumber.stop())
		.pipe(gulp.dest('dist/js'));
});

// Build temporary JS
gulp.task('js:dev', () => {
	gulp.src('./src/js/**/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('temp/js'))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(plumber.stop())
		.pipe(gulp.dest('temp/js'));
});

// Generate docs.json
gulp.task('docs', () => {
	return gulp.src(['./src/scss/**/*.scss'])
		.pipe(docs({
			fileName: 'docs',
			parsers: {
				// @state :hover - When the button is hovered over.
				state: function(i, line, block, file, endOfBlock) {
					var values = line.split(' - '),
					states = (values[0]) ? (values[0].replace(":::", ":").replace("::", ":")) : "";

					return {
						name: states,
						escaped: states.replace(":", " :").replace(".", " ").trim(),
						description: (values[1]) ? values[1].trim() : ""
					};
				}
			}
		}))
		.pipe(gulp.dest('./docs/'));
});

// Create SVG sprite from icons in ./src/icons
gulp.task('sprite:dist', ['svg-min'], () => {
	return gulp.src('./src/icons/**/*.svg')
		.pipe(svgSprite({
			mode: {
				symbol: {
					prefix: '.icon-%s',
					dimensions: false,
					sprite: '../../dist/icons/sprite.svg',
					bust: false,
					render: {
						css: false,
						scss: {
							template: './src/icons-template.mustache',
							dest: '../scss/components/_icons.scss'
						}
					}
				}
			}
		}))
		.pipe(gulp.dest('./src'));
});

// Clean up SVGs
gulp.task('svg-min', () => {
	return gulp.src('./src/icons/**/*.svg')
		.pipe(svgmin({
			plugins: [{
				removeDimensions: true // Remove width and height
			}]
		}))
		.pipe(gulp.dest('./src/icons'))
});

// Copy fonts to temporary directory
gulp.task('fonts:dist', () => {
	return gulp.src('./src/fonts/*')
		.pipe(gulp.dest('./dist/fonts/'))
});

// Copy fonts to the dist directory
gulp.task('fonts:dev', () => {
	return gulp.src('./src/fonts/*')
		.pipe(gulp.dest('./temp/fonts/'))
});

// Clean images
gulp.task('img:dist', () => {
	return gulp.src('./src/img/**/*')
		.pipe(gulp.dest('./dist/img/'))
})

// Browsersync
gulp.task('browsersync', () => {
	browsersync.init({
		proxy: 'styleguide.app'
	});
});

// Browsersync reload
gulp.task('bs-reload', () => {
	browsersync.reload();
});

// Watch
gulp.task('watch', ['css:dev', 'js:dev', 'fonts:dev', 'sprite:dist', 'docs', 'browsersync'], () => {
	gulp.watch('./src/scss/**/*.scss', ['css:dev', 'docs', 'bs-reload']);
	gulp.watch('./src/js/**/*.js', ['js:dev', 'docs', 'bs-reload']);
	gulp.watch('./src/img/**/*', ['img:dist', 'docs', 'bs-reload']);
	// Watch for changes in icon template
	gulp.watch('./src/icons-template.mustache', ['sprite:dist', 'css:dev', 'docs', 'bs-reload']);
});


// Production
gulp.task('dist', ['css:dist', 'sprite:dist', 'js:dist', 'fonts:dist', 'img:dist', 'docs' ], () => {

});
