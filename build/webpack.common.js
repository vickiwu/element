/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 11:24:41
 * @LastEditors: vickiWu
 * @Description:以 commonjs2 规范打包构建类库。
 * @FilePath: \element\build\webpack.common.js
 */
// 执行打包webpack --config build/webpack.common.js,入口文件 src/index.js 以commonjs2格式输出到 lib/element-ui.common.js;
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 构建进度条
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = require('./config'); // webpack公共配置

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: 'element-ui.common.js', // 打包构建的文件名
    chunkFilename: '[id].js', // 按需加载的chunk文件
    libraryExport: 'default', // 决定暴露的模块
    library: 'ELEMENT', // 库的名称
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  externals: config.externals,
  performance: {
    hints: false // 不展示警告或错误信息
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
  ]
};
