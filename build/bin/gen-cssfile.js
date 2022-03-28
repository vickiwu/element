/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-24 16:07:21
 * @LastEditors: vickiWu
 * @Description:
 * @FilePath: \element\build\bin\gen-cssfile.js
 */
// 执行 build/bin/gen-cssfile 生成 packages/theme-chalk/index.scss 样式总入口文件。全量引入组件时，引用该样式 import 'packages/theme-chalk/src/index.scss'
var fs = require('fs');
var path = require('path');
// 项目组件清单
var Components = require('../../components.json');
// 主题列表
var themes = [
  'theme-chalk'
];
// 获取组件名称
Components = Object.keys(Components);
// 组件package路径
var basepath = path.resolve(__dirname, '../../packages/');

// 判断文件是否存在
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}
// 构建，动态生成入口文件 index.scss
themes.forEach((theme) => {
  // 不是默认主题 使用sass预处理器
  var isSCSS = theme !== 'theme-default';
  // 导入基础样式
  var indexContent = isSCSS ? '@import "./base.scss";\n' : '@import "./base.css";\n';
  // 找对应组件的scss文件，生成import语句
  Components.forEach(function(key) {
    if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
    var fileName = key + (isSCSS ? '.scss' : '.css');
    indexContent += '@import "./' + fileName + '";\n';
    // 组件样式文件路径  packages/theme-chalk/src/component.scss
    var filePath = path.resolve(basepath, theme, 'src', fileName);
    // 组件样式是否存在，不存在则创建遗漏的组件样式文件
    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8');
      console.log(theme, ' 创建遗漏的 ', fileName, ' 文件');
    }
  });
  // 生成packages/theme-chalk/src/component.scss
  fs.writeFileSync(path.resolve(basepath, theme, 'src', isSCSS ? 'index.scss' : 'index.css'), indexContent);
});
