var gulp = require('gulp'),
sass = require('gulp-sass'),
spritesmith = require('gulp.spritesmith'),
sourcemaps = require('gulp-sourcemaps'),
stripCssComments = require('gulp-strip-css-comments'),
prefix = require('gulp-autoprefixer')
combineMq = require('gulp-combine-mq'),
livereload = require('gulp-livereload'),

gulp.task('sprite', function () {
    var spriteData = gulp.src('Content/images/*.png')
        .pipe(spritesmith({
            /* this whole image path is used in css background declarations */
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }));
    spriteData.img.pipe(gulp.dest('./Content/build'));
    spriteData.css.pipe(gulp.dest('./Content/build'));
});

gulp.task('sass', function () {
  return gulp.src('Content/*.scss') // Get The Source Files
  .pipe(sourcemaps.init()) // To Initialize The Sourcemap ( For Getting The Source (Line) Of Code In The Scss File )
  .pipe(sass()) 
  .pipe(prefix('last 2 versions')) // Add Prefixes (Css3) For 2 Last versions of Browsers
  .pipe(combineMq()) // Combine Media Queries
  .pipe(stripCssComments()) //remove comments
  .pipe(sourcemaps.write('maps')) // Create The Sourcemap In a Folder Named maps ( if we don't write the map in a precise destination it will be created in our file generated which make the size of the file more bigger )
  .pipe(gulp.dest('./Content/build')) // Send The Files To The Destination
  .pipe(livereload()) // Reload Page When Save Files
});

//les tache par default qui se lance avec la commande "gulp"
gulp.task('default', ['sprite','sass'], function () {
    gulp.watch('Content/images/*.png', ['sprite']);
    gulp.watch('Content/*.scss', ['sass']);
});