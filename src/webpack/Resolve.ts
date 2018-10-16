// const path = require('path')
import path from 'path'

export default {
  // alias
  // alias: {
  //   'components': path.resolve(__dirname, '../components'),
  //   'libs': path.resolve(__dirname, '../src/libs'),
  //   'utils': path.resolve(__dirname, '../utils')
  // },

  // extensions
  extensions: ['.ts', '.tsx', '.json', '.js'], 

  // modules
  modules: [
    // 减少构建搜索或编译路径，可以获得显著的性能提升
    path.resolve(__dirname, '../src/'),
    'node_modules'
  ],

}