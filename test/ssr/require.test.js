/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 15:17:05
 * @LastEditors: vickiWu
 * @Description:SSR 引入类库(require)测试, build\release.sh文件执行 node test/ssr/require.test.js 命令。
 * @FilePath: \element\test\ssr\require.test.js
 */

const path = require('path');

try {
  process.env.VUE_ENV = 'server';
  require(path.join(process.env.PWD, './lib/index'));
  console.log('SSR require test PASS');
} catch (e) {
  console.error('SSR require test error');
  throw Error(e);
}
