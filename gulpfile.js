const gulp = require('gulp')
const es = require('event-stream')
const rename = require('gulp-rename')

const wrap = function(header, footer) {
  return es.map(function (file, cb) {
    const contents = String(file.contents)
    try {
      file.contents = new Buffer(`${header}${contents}${footer}`)
    } catch (err) {
      return cb(new gutil.PluginError('gulp-inject-string', err))
    }
    cb(null, file)
  })
}

const header = '<template>\n'
const footer = '</template>'

gulp.task('default', () => {
  gulp.src('feather/icons/**/*.svg')
    .pipe(wrap(header, footer))
    .pipe(rename({
      extname: '.vue'
    }))
    .pipe(gulp.dest('components'))
})