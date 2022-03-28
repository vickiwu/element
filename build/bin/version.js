/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 10:36:39
 * @LastEditors: vickiWu
 * @Description:
 * @FilePath: \element\build\bin\version.js
 */
// 生成 examples/version.json 记录项目版本信息，用于网站版头部导航版本切换。
var fs = require('fs');
var path = require('path');
var version = process.env.VERSION || require('../../package.json').version; // 获取版本信息
var content = { '1.4.13': '1.4', '2.0.11': '2.0', '2.1.0': '2.1', '2.2.2': '2.2', '2.3.9': '2.3', '2.4.11': '2.4', '2.5.4': '2.5', '2.6.3': '2.6', '2.7.2': '2.7', '2.8.2': '2.8', '2.9.2': '2.9', '2.10.1': '2.10', '2.11.1': '2.11', '2.12.0': '2.12', '2.13.2': '2.13', '2.14.1': '2.14' };
if (!content[version]) content[version] = '2.15';
// 生成项目库版本信息
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content));

//  process.env.VERSION参数传入
// 当执行命令 npm run pub 发布组件库时，会执行脚本 build/release.sh，会手动输入发布本信息(read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r),然后执行命令 VERSION=$VERSION npm run dist。

// 整个执行顺序 👉 npm run pub=>sh build/release.sh=>输入$VERSION=>VERSION=$VERSION  npm run dist=> npm run build:file=> node build/bin/version.js 。
