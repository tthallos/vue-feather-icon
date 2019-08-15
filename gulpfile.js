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

const upCamelize = (str, separator = '-') => {
  return str.split(separator).map((item) => {
    return item.charAt(0).toUpperCase() + item.slice(1)
  }).join('')
}

gulp.task('pia', () => {
  gulp.src('feather/dist/icons/**/*.svg')
    .pipe(wrap((name, content) => {
      return `exports.${upCamelize(name)} = require('./components/${name}.vue')`
    }))
    .pipe(concat('index.js'))
    .pipe(wrap((filename, content) => `exports.install = require('./plugin.js')\n${content}`))
    .pipe(gulp.dest('./'))
})

gulp.task('typescript', () => {
  gulp.src('feather/dist/icons/**/*.svg')
    .pipe(wrap((name, content) => {
      return `  export class ${upCamelize(name)} {}`
    }))
    .pipe(concat('index.d.ts'))
    .pipe(wrap((filename, content) => `import Vue from 'vue';\n\ndeclare module 'vue-feather-icon' {\n  export function install(): void;\n${content}\n}`))
    .pipe(gulp.dest('./'))
})

gulp.task('components', () => {
  gulp.src('feather/dist/icons/**/*.svg')
    .pipe(wrap((name, content) => {
      return `  Vue.component('feather-${name}', require('./components/${name}.vue').default)`
    }))
    .pipe(concat('plugin.js'))
    .pipe(wrap((filename, content) => `module.exports = function(Vue) {\n  Vue.component('feather-icon', require('./components/index.vue').default)\n${content}\n}`))
    .pipe(gulp.dest('./'))
})

gulp.task('component', () => {
  gulp.src('feather/dist/icons/**/*.svg')
    .pipe(wrap((name, content) => {
      return `<template>\n${content}\n</template>`
    }))
    .pipe(rename({
      extname: '.vue'
    }))
    .pipe(flatten())
    .pipe(gulp.dest('./components'))
})

gulp.task('default', ['component', 'components', 'pia', 'typescript'])