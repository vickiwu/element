'use strict';
// 采用 gulp 进行样式构建，将packages/theme-chalk/src下的 scss 文件转换成 css 文件，输出至packages/theme-chalk/src/lib目录下;将packages/theme-chalk/src/fonts下的字体文件压缩处理，输出至 packages/theme-chalk/src/lib/fonts 目录下。
// 执行 cp-cli packages/theme-chalk/lib lib/theme-chalk （cp-cli复制） 将构建内容 packages/theme-chalk/lib 拷贝到 lib/theme-chalk 下。前面 sytle 属性配置的路径文件 lib/theme-chalk/index.css 就是这样生成的。
const { series, src, dest } = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./lib'));
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'));
}

exports.build = series(compile, copyfont);
