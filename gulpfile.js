const path = require('path')
const gulp = require('gulp')
const es = require('event-stream')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const flatten = require('gulp-flatten')
const gutil = require('gulp-util')

const wrap = function(inject) {
  return es.map(function (file, cb) {
    const contents = String(file.contents)
    const filename = path.basename(file.path, '.svg')
    try {
      file.contents = new Buffer(inject(filename, contents))
    } catch (err) {
      return cb(new gutil.PluginError('void', err))
    }
    cb(null, file)
  })
}


gulp.task('components', () => {
  gulp.src('feather/icons/**/*.svg')
    .pipe(wrap((name, content) => {
      let c = content.replace(/\n/g, '')
      return `  Vue.component('feather-${name}', '<template>${c}</template>')`
    }))
    .pipe(concat('index.js'))
    .pipe(wrap((filename, content) => `exports.install = function(Vue) {\n${content}\n}`))
    .pipe(gulp.dest('./'))
})

gulp.task('component', () => {
  gulp.src('feather/icons/**/*.svg')
    .pipe(wrap((name, content) => {
      return `<template>\n${content}</template>`
    }))
    .pipe(rename({
      extname: '.vue'
    }))
    .pipe(flatten())
    .pipe(gulp.dest('./components'))
})

gulp.task('default', ['components', 'component'])