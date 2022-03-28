/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 11:17:01
 * @LastEditors: vickiWu
 * @Description:打包配置的公用配置。
 * @FilePath: \element\build\config.js
 */
var path = require('path');
var fs = require('fs');
// 排除node_modules中模块
var nodeExternals = require('webpack-node-externals');
// 所有项目组件
var Components = require('../components.json');

// 源码
var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
var externals = {}; // 外部扩展

Object.keys(Components).forEach(function(key) {
  externals[`element-ui/packages/${key}`] = `element-ui/lib/${key}`;
});

// 国际化
externals['element-ui/src/locale'] = 'element-ui/lib/locale';
// 源码遍历
utilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/utils/${file}`] = `element-ui/lib/utils/${file}`;
});
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/mixins/${file}`] = `element-ui/lib/mixins/${file}`;
});
transitionList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/transitions/${file}`] = `element-ui/lib/transitions/${file}`;
});
// vue库
externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;
// 创建import或require的别名
exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'element-ui': path.resolve(__dirname, '../')
};
// webpack.cong.js vue扩展依赖设置
exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;

// 外部扩展(externals) 从输出的 bundle 中排除依赖,在运行时(runtime)从外部获取这些扩展依赖(external dependencies),主要解决组件依赖导致代码冗余问题。
