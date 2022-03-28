/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 10:32:41
 * @LastEditors: vickiWu
 * @Description:
 * @FilePath: \element\build\bin\template.js
 */
// 同时执行build/bin/template.js文件启动监听examples/pages/template目 录下模板文件，若内容发生变化，会自动执行命令npm run i18n，运行文件build/bin/i18n.js，重新生成网站文件。。
const path = require('path');
const templates = path.resolve(process.cwd(), './examples/pages/template'); // 模板

const chokidar = require('chokidar'); // chokidar专门用于文件监控
let watcher = chokidar.watch([templates]);

watcher.on('ready', function() {
  // 监听文件，文件夹变化
  watcher
    .on('change', function() {
      // 自动执行命令，生成文件
      exec('npm run i18n');
    });
});
// 调用cmd方法
function exec(cmd) {
  return require('child_process').execSync(cmd).toString().trim();
}
