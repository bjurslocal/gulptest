var gulp = require('gulp'),
	uglify = require('gulp-uglify');
	browserSync = require('browser-sync');
	reload = browserSync.reload;
	compass = require('gulp-compass');
	plumber = require('gulp-plumber');
	autoprefixer = require('gulp-autoprefixer');
	rename = require('gulp-rename');

gulp.task('scripts', function() {
	gulp.src(['js/*.js','!js/*.min.js'])
	.pipe(plumber())
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('js'))
	.pipe(reload({stream:true}));
});

gulp.task('compass', function() {
	gulp.src('scss/style.scss')
	.pipe(plumber())
	.pipe(compass({
		config_file: 'config.rb',
		css: 'css',
		sass: 'scss'
	}))
	.pipe(autoprefixer('last 3 versions'))
	.pipe(gulp.dest('../css'))
	.pipe(reload({stream:true}));
});

gulp.task('html', function() {
	gulp.src('*.html')
	.pipe(reload({stream:true}));
});


// gulp.task('html', function() {
// 	gulp.src('index.html')
// 	.pipe(reload({stream:true}));
// });

gulp.task('watch', function() {
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('scss/**/*.scss', ['compass']);
	gulp.watch('*.html', ['html']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['scripts', 'compass', 'html', 'browser-sync', 'watch']);