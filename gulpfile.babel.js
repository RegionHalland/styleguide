import gulp from 'gulp'
import sass from 'gulp-sass'
import browsersync from 'browser-sync'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'
import tailwindcss from 'tailwindcss'

gulp.task('css', () => {
	const plugins = [
		tailwindcss('tailwind.config.js'),
		autoprefixer
	]

	return gulp.src('src/scss/main.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('build/'))
})

gulp.task('browsersync', () => {
    browsersync.init({
    	files: 'build/*.css'
    })
})

// Browsersync reload
gulp.task('bs-reload', () => {
	browsersync.reload()
});

// Watch
gulp.task('watch', ['css', 'browsersync'], () => {
	gulp.watch('./src/scss/**/*.css', ['css', 'bs-reload'])
})
