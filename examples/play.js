/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 16:24:14
 * @LastEditors: vickiWu
 * @Description:执行命令npm run dev:play，build/webpack.demo.js 打包入口文件examples/play.js, 引用 examples/play/index.vue, 可以引入组件库任意组件用于功能展示。
 * @FilePath: \element\examples\play.js
 */

import Vue from 'vue';
import Element from 'main/index.js'; // main 别名 ../src
import App from './play/index.vue';
// 引入组件样式
import 'packages/theme-chalk/src/index.scss';

Vue.use(Element);

new Vue({ // eslint-disable-line
  render: h => h(App)
}).$mount('#app');
