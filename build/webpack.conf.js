/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 11:33:19
 * @LastEditors: vickiWu
 * @Description:以 umd 规范打包构建类库,不仅可以 NodeJs 环境使用，也可以在浏览器环境（browser）使用，需要设置umdNamedDefine: true。
 * @FilePath: \element\build\webpack.conf.js
 */
// 执行打包webpack --config build/webpack.conf.js,入口文件 src/index.js 以 umd 格式输出到 lib/index.js;
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin'); // terser压缩代码

const config = require('./config');

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'ELEMENT',
    umdNamedDefine: true, // 将命名由UMD构建的AMD模块
    globalObject: 'typeof self !== \'undefined\' ? self : this' // 在全局对象挂载库library
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias
  },
  // 防止将某些import的包（package）打包到bundle中
  // 在运行时（runtime）再去从外部获取这些扩展依赖
  externals: {
    // config.vue
    // {
    //   root: 'Vue',
    //   commonjs: 'vue',
    //   commonjs2: 'vue',
    //   amd: 'vue'
    // }
    vue: config.vue
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
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
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
  ]
};

// externals 配置
// 通过这种方式引入的依赖库，不会打包到 bundle 中。以下任何一种形式在各种模块上下文使用：

// root：可以通过一个全局变量访问 library（例如，通过 script 标签）。
// commonjs：可以将 library 作为一个 CommonJS 模块访问。
// commonjs2：和上面的类似，但导出的是 module.exports.default。
// amd：类似于 commonjs，但使用 AMD 模块系统。

// 一个形如 { root, amd, commonjs, ... } 的对象仅允许用 libraryTarget: 'umd' 这样的配置.
