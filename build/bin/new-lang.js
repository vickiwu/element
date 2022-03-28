/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 10:10:31
 * @LastEditors: vickiWu
 * @Description:
 * @FilePath: \element\build\bin\new-lang.js
 */
'use strict';
// 为网站添加新语言。例如 'make new-lang fr' ，添加新语言配置至 components.json、page.json、route.json、nav.config.json等文件中，配置默认复制en-US语言设置，新建对应文件夹  examples/docs/fr
console.log();
// 监听exit事件
process.on('exit', () => {
  console.log();
});
// 判断第三个参数是否传入 指定添加语言
if (!process.argv[2]) {
  console.error('[language] is required!');
  process.exit(1);
}

var fs = require('fs');
const path = require('path');
const fileSave = require('file-save');
const lang = process.argv[2]; // 添加的新语言
// const configPath = path.resolve(__dirname, '../../examples/i18n', lang);

// 添加到 components.json
const componentFile = require('../../examples/i18n/component.json');
// 判断components.json是否存在该语言
if (componentFile.some(item => item.lang === lang)) {
  console.error(`${lang} already exists.`);
  process.exit(1);
}
// 配置语言配置，复制“en-US”语言设置
let componentNew = Object.assign({}, componentFile.filter(item => item.lang === 'en-US')[0], { lang });
// 添加配置到页面中
componentFile.push(componentNew);
// 更新component.json
fileSave(path.join(__dirname, '../../examples/i18n/component.json'))
  .write(JSON.stringify(componentFile, null, '  '), 'utf8')
  .end('\n');

// 添加到 page.json
const pageFile = require('../../examples/i18n/page.json');
let pageNew = Object.assign({}, pageFile.filter(item => item.lang === 'en-US')[0], { lang });
pageFile.push(pageNew);
fileSave(path.join(__dirname, '../../examples/i18n/page.json'))
  .write(JSON.stringify(pageFile, null, '  '), 'utf8')
  .end('\n');

// 添加到 route.json
const routeFile = require('../../examples/i18n/route.json');
// 添加新语言 {"lang": "fr"}
routeFile.push({ lang });
fileSave(path.join(__dirname, '../../examples/i18n/route.json'))
  .write(JSON.stringify(routeFile, null, '  '), 'utf8')
  .end('\n');

// 添加到 nav.config.json
const navFile = require('../../examples/nav.config.json');
navFile[lang] = navFile['en-US']; // 默认使用en-US配置
fileSave(path.join(__dirname, '../../examples/nav.config.json'))
  .write(JSON.stringify(navFile, null, '  '), 'utf8')
  .end('\n');

// docs 下新建对应文件夹
try {
  fs.statSync(path.resolve(__dirname, `../../examples/docs/${ lang }`));
} catch (e) {
  fs.mkdirSync(path.resolve(__dirname, `../../examples/docs/${ lang }`));
}

console.log('新语言添加DONE!');
