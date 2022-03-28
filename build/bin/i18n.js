/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 09:56:53
 * @LastEditors: vickiWu
 * @Description:
 * @FilePath: \element\build\bin\i18n.js
 */
// 生成官网的多语言网站文件
'use strict';

var fs = require('fs');
var path = require('path');
// 页面国际化配置
var langConfig = require('../../examples/i18n/page.json');

langConfig.forEach(lang => {
  // 创建各种语言页面目录
  try {
    fs.statSync(path.resolve(__dirname, `../../examples/pages/${ lang.lang }`));
  } catch (e) {
    fs.mkdirSync(path.resolve(__dirname, `../../examples/pages/${ lang.lang }`));
  }
  // 遍历页面，根据${ page }.tpl生成对应语言的.vue文件
  Object.keys(lang.pages).forEach(page => {
    // 页面模板
    var templatePath = path.resolve(__dirname, `../../examples/pages/template/${ page }.tpl`);
    // 生成文件的输出路径
    var outputPath = path.resolve(__dirname, `../../examples/pages/${ lang.lang }/${ page }.vue`);
    // 读取模板文件
    var content = fs.readFileSync(templatePath, 'utf8');
    // 读取页面的翻译信息 列表 k/v
    var pairs = lang.pages[page];
    // 遍历列表，替换模板变量
    Object.keys(pairs).forEach(key => {
      content = content.replace(new RegExp(`<%=\\s*${ key }\\s*>`, 'g'), pairs[key]);
    });
    // 生成vue文件写入
    fs.writeFileSync(outputPath, content);
  });
});
