var gulp =    require('gulp');
var stylus =  require('gulp-stylus');
var plumber = require('gulp-plumber');
var coffee =  require('gulp-coffee');
var jade =    require('gulp-jade');
var nib =     require('nib');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');


//Preprocessors

gulp.task('stylus', function() {
  gulp.src(['./src/stylus/estilos.styl', './src/stylus/components/*.styl'])
  	.pipe(plumber())
    .pipe(stylus({
      'use': [nib()],
      'include css': true,
      'compress': true
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('jade', function(){
  gulp.src(['./src/jade/*.jade', './src/jade/templates/*.jade'])
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('./public'))
});

gulp.task('coffee', function() {
  gulp.src('./src/coffeescript/*.coffee')
  	.pipe(plumber())
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./public/js'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public",
            index: "index.html"
        }
    });
  });

gulp.task('image', function () {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest('./public/img'));
});



// Watch task

gulp.task('watch', function(){
	gulp.watch(['./src/stylus/estilos.styl', './src/stylus/components/*.styl'],['stylus'])
	gulp.watch('./src/coffeescript/*.coffee',['coffee'])
  gulp.watch(['./src/jade/*.jade', './src/jade/templates/*.jade'],['jade'])
});

//Default task

gulp.task('default',['watch', 'stylus','coffee','jade','browser-sync','image']);
