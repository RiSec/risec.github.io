const gulp = require('gulp');
const assemble = require('assemble');
const extname = require('gulp-extname');
const webserver = require('gulp-webserver');

gulp.task('build', ['copy', 'hbs']);

gulp.task('copy', () => {
  return gulp.src([
    'src/**/*',
    '!src/**/*.hbs',
    '!src/**/*.json'
  ]).pipe(gulp.dest('./dist/'));
});

gulp.task('hbs', () => {
  const app = assemble();
  app.layouts('src/layouts/default.hbs');
  app.pages('src/**/*.hbs');

  return app.toStream('pages')
    .pipe(app.renderFile({
      layout: 'default',
      obj: require('./src/data.json')
    }))
    .pipe(extname('.html'))
    .pipe(app.dest('./dist/'));
});

gulp.task('start', ['build'], () => {
  gulp.src('dist')
    .pipe(webserver({
      host: 'localhost',
      port: 3030,
      livereload: true
    }));

  return gulp.watch('./src/**', ['build']);
});
