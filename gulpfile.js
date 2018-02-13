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
		html:   'build/',
		js:     'build/js/',
		styles: 'build/styles/',
		img:    'build/img/',
		fonts:  'build/fonts/',
		icons:  'build/icons/',
		video:  'build/video/',
	},
	src: {
		html:   'src/*.html',
		js:     'src/js/*.js',
		styles: 'src/styles/*.css',
		img:    'src/img/**/*.*',
		fonts:  'src/fonts/**/*.*',
		icons:  'src/icons/**/*.*',
		video:  'src/video/**/*.*',
	},
	watch: {
		html:    'src/**/*.html',
		js:      'src/js/**/*.js',
		styles:  'src/styles/**/*.css',
		img:     'src/img/**/*.*',
		fonts:   'src/fonts/**/*.*',
		icons:   'src/icons/**/*.*',
		video:   'src/video/**/*.*',
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
        // .pipe(gulpIf(production, sourcemaps.init())) //Инициализируем sourcemap
        .pipe(gulpIf(production, uglify()))
        // .pipe(gulpIf(production, concat('bundle.js')))//Склеиваем js-ы в один фаил
        // .pipe(gulpIf(production, sourcemaps.write()))//Пропишем карты
        .pipe(gulpIf(production, gulp.dest(path.build.js)))
        .pipe(reload({stream: true}));
});

gulp.task('styles:build', function () {
    gulp.src(path.src.styles) //Выберем наши css
        // .pipe(gulpIf(production, sourcemaps.init())) //Инициализируем sourcemap
        // .pipe(sass({
        //     sourceMap: true,
        //     errLogToConsole: true
        // }))
        .pipe(gulpIf(production, autoprefixer()))//Добавим вендорные префиксы
        .pipe(gulpIf(production, cleanCSS()))//Сжимаем CSS-ы
        // .pipe(gulpIf(production, concat('bundle.css')))//Склеиваем CSS-ы в один фаил
        // .pipe(gulpIf(production, sourcemaps.write()))//Пропишем карты
        .pipe(gulpIf(production, gulp.dest(path.build.styles)))//Выкладываем в build
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

gulp.task('icons:build', function() {
    gulp.src(path.src.icons)
        .pipe(gulpIf(production, gulp.dest(path.build.icons)))
        .pipe(reload({stream: true}));
});
gulp.task('video:build', function() {
    gulp.src(path.src.video)
        .pipe(gulpIf(production, gulp.dest(path.build.video)))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
	'html:build',
	'js:build',
	'styles:build',
	'fonts:build',
	'img:build',
	'icons:build',
	'video:build',
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


