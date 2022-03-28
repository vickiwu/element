/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 10:01:53
 * @LastEditors: vickiWu
 * @Description:
 * @FilePath: \element\build\bin\iconInit.js
 */
'use strict';
// 自动生成examples/icon.json 图标集合文件
// 使用 postcss 解析 icon.scss，提取所有 icon 名字生成 examples/icon.json 文件。
var postcss = require('postcss');
var fs = require('fs');
var path = require('path');
var fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon.scss'), 'utf8');
var nodes = postcss.parse(fontFile).nodes; // postcss解析文件后的node对象
// 存放icon名称
var classList = [];

nodes.forEach((node) => {
  // 选择器名称
  var selector = node.selector || '';
  var reg = new RegExp(/\.el-icon-([^:]+):before/);
  var arr = selector.match(reg);

  if (arr && arr[1]) {
    classList.push(arr[1]);
  }
});

classList.reverse(); // 希望按 css 文件顺序倒序排列
// 将icon名称写入examples/icon.json' 入口文件
fs.writeFile(path.resolve(__dirname, '../../examples/icon.json'), JSON.stringify(classList), () => {});
