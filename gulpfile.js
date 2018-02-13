var gulp = require('gulp');
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	// rigger = require('gulp-rigger'), //= template/footer.html
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	gulpIf = require('gulp-if'),
	watch = require('gulp-watch'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

var env = process.env.NODE_ENV || "development" ;// NODE_ENV=production gulp
var production = env === "production" ? true : false;

var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		styles: 'build/styles/',
		img: 'build/img/',
		fonts: 'build/fonts/',
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/*.js',
		styles: 'src/styles/*.css',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*',
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		styles: 'src/styles/**/*.css',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*',
	}
};

var config = {
    server: {
        baseDir: production ? "./build" : "./src",
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        // .pipe(rigger())
        .pipe(gulpIf(production, gulp.dest(path.build.html)))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        // .pipe(rigger()) 
        .pipe(gulpIf(production, sourcemaps.init()))
        .pipe(gulpIf(production, uglify()))
        .pipe(gulpIf(production, sourcemaps.write()))
        .pipe(gulpIf(production, gulp.dest(path.build.js)))
        .pipe(reload({stream: true}));
});

gulp.task('styles:build', function () {
    gulp.src(path.src.styles) 
        .pipe(gulpIf(production, sourcemaps.init()))
        // .pipe(sass({
        //     sourceMap: true,
        //     errLogToConsole: true
        // }))
        .pipe(gulpIf(production, autoprefixer()))
		.pipe(gulpIf(production, cleanCSS()))
		.pipe(gulpIf(production, concat('bundle.css')))
        .pipe(gulpIf(production, sourcemaps.write()))
        .pipe(gulpIf(production, gulp.dest(path.build.styles)))
        .pipe(reload({stream: true}));
});

gulp.task('img:build', function () {
    gulp.src(path.src.img) 
        .pipe(gulpIf(production, imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        })))
        .pipe(gulpIf(production, gulp.dest(path.build.img)))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulpIf(production, gulp.dest(path.build.fonts)))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
	'html:build',
	'js:build',
	'styles:build',
	'fonts:build',
	'img:build',
]);

gulp.task('webserver', function(){
	browserSync(config);
})

gulp.task('watch', function(){
	watch([path.watch.html], function(event, cb){
		gulp.start('html:build');
	});
	watch([path.watch.styles], function(event, cb){
		gulp.start('styles:build');
	});
	watch([path.watch.js], function(event, cb){
		gulp.start('js:build');
	});
	watch([path.watch.img], function(event, cb){
		gulp.start('img:build');
	});
	watch([path.watch.fonts], function(event, cb){
		gulp.start('fonts:build');
	});

});

gulp.task('default', ['build','webserver','watch', ], function(){
		console.log("NODE_ENV=" + env);
});


