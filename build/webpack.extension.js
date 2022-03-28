/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 13:34:47
 * @LastEditors: vickiWu
 * @Description:用于构建名为Element Theme Roller的 chorme 插件项目，复用大部分 webpack.demo.js 打包配置。
 * @FilePath: \element\build\webpack.extension.js
 */
// 基于 production 模式打包生成内容输出至 examples/extension/dist 目录下。生成文件 background.js entry.js ,复制文件 icon.png manifest.json 。
// npm run deploy:extension用于项目生产发布； npm run  dev:extension用于开发调试。
// Element Theme Roller插件可以自定义全局变量和组件的所有设计标记，并实时预览新主题并基于新主题生成完整的样式包，以供直接下载
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const demoConfig = require('./webpack.demo');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

demoConfig.entry = {
  background: path.join(process.cwd(), './examples/extension/src/background'),
  entry: path.join(process.cwd(), './examples/extension/src/entry')
};
demoConfig.output = {
  path: path.join(process.cwd(), './examples/extension/dist'),
  filename: '[name].js'
};
demoConfig.plugins = [
  // 复制文件
  new CopyWebpackPlugin([
    { from: 'examples/extension/src/manifest.json' },
    { from: 'examples/extension/src/icon.png' }
  ]),
  new VueLoaderPlugin(),
  new ProgressBarPlugin(),
  new webpack.LoaderOptionsPlugin({
    vue: {
      compilerOptions: {
        preserveWhitespace: false
      }
    }
  }),
  new webpack.HotModuleReplacementPlugin()
];
demoConfig.module.rules.find(a => a.loader === 'url-loader').query = {};
module.exports = demoConfig;
