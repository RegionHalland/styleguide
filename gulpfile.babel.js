'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gutil from 'gulp-util';
import browsersync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import docs from 'gulp-docs';

// Build css
gulp.task('css:dist', () => {
	// PostCSS plugins
	const plugins = [
		autoprefixer({browsers: ['last 1 version']}),
		cssnano()
	];
	return gulp.src('./src/scss/**/*.scss')
		.pipe(plumber({ errorHandler: reportError }))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss(plugins))
		.pipe(browsersync.stream())
		.pipe(sourcemaps.write())
		.pipe(plumber.stop())
		.pipe(gulp.dest('./dist/css/'))
});

// Generate docs.json-filer
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
gulp.task('watch', ['css:dist', 'docs', 'browsersync'], () => {
	gulp.watch('./src/scss/**/*.scss', ['css:dist', 'docs', 'bs-reload']);
	gulp.watch('./demo/*.html', ['bs-reload']);
})

// Error reporter
let reportError = function (error) {
    console.error(error);
    gutil.beep(); 
	this.emit('end');
}
