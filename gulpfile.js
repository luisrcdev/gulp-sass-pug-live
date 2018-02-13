const gulp = require('gulp'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer');


// Start BrowserSync y el servidor
gulp.task('servidor', () =>
	browserSync.init({
		server: './'
	})
);

// Compilar sass
gulp.task('sass', () =>
	gulp.src('./scss/main.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(autoprefixer({
			versions: ['last 2 browsers']
		}))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream())

);


// Compilar pug
gulp.task('pug', () =>
	gulp.src('./pug/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream())
);


// Automatizar servidor, sass y pug
gulp.task('default', ['servidor'], () => {
	gulp.watch('./pug/index.pug', ['pug']);
	gulp.watch('./scss/main.scss', ['sass']);
	gulp.watch('./index.html').on('change', browserSync.reload);
});


