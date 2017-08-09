#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const baseDir = path.join(__dirname, '../')
const iconsDir = path.join(__dirname, '../feather/icons')
const compsDir = path.join(__dirname, '../components')

const convertComp = (source) => `
<template>
  ${source}
</template>
`

const convertPlugin = (source) => `
module.exports = function(Vue) {
  Vue.component('feather-icon', require('./components/index.vue'))
  ${source}
}
`

const compFileNames = fs.readdirSync(iconsDir).map((filename) => {
  const compFileName = filename.replace('svg', 'vue')
  const content = fs.readFileSync(`${iconsDir}/${filename}`, {encoding: 'utf-8'})
  fs.writeFileSync(`${compsDir}/${compFileName}`, convertComp(content))
  return compFileName
})

const pluginContent = compFileNames.map((compFileName) => {
  const compName = compFileName.split('.').shift()
  return `Vue.component('feather-${compName}', require('./components/${compFileName}'))`
}).join('\r\n  ')

fs.writeFileSync(`${baseDir}/plugin.js`, convertPlugin(pluginContent))
