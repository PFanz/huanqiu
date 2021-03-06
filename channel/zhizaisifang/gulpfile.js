var gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS = require('gulp-clean-css'),
		postcss = require('gulp-postcss'),
		babel = require('gulp-babel'),
		order = require('gulp-order'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin'),
		browserSync = require('browser-sync').create();

var processors = [
		require('cssgrace')
];

gulp.task('default', function() {
	// 默认任务代码
});

// css
gulp.task('sass', function() {
	return gulp.src('src/sass/*.scss')
					.pipe(sass())
					.pipe(autoprefixer({
						browsers: ['last 2 versions', 'ios 6', 'android >= 4.0', 'IE 8'],
						remove: false
					}))
					.pipe(postcss(processors))
					.pipe(gulp.dest('src/css'))
					.pipe(cleanCSS())
					.pipe(gulp.dest('dist/css'))
					.pipe(browserSync.reload({stream: true}));
});

// 压缩JS
gulp.task('minfile', function() {
	// jslib
	gulp.src('src/libs/**')
		.pipe(gulp.dest('dist/libs'));
	// js
	gulp.src('src/ES6/*.js')
		.pipe(babel({
			presets: ['es2015', 'stage-0']
			// plugins: ["transform-es2015-modules-amd"]
		}))
		.pipe(gulp.dest('src/js'))
		.pipe(order([
			'!main.js',
			'main.js'
		]))
		.pipe(concat('index.js'))
		.pipe(gulp.dest('src/js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

// 压缩图片
gulp.task('imageMin', function() {
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'));
});

// browser-sync服务
gulp.task('serve', ['sass', 'minfile', 'imageMin'], function() {
	browserSync.init({
		server: './'
	});

	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/ES6/*.js', ['minfile']).on('change', browserSync.reload);
	gulp.watch('src/images/*',['imageMin']).on('change', browserSync.reload);
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['minfile', 'sass', 'imageMin', 'serve']);