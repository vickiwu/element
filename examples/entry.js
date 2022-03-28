/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 16:21:41
 * @LastEditors: vickiWu
 * @Description:网站入口文件
 * @FilePath: \element\examples\entry.js
 */
import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
// 引入组件库，main是在/build/config.js中配置别名 "../src"
import Element from 'main/index.js';
import hljs from 'highlight.js';
import routes from './route.config';
// demo-block 组件 支持示例组件渲染、高亮代码
import demoBlock from './components/demo-block';
// 网站页面 模板页面组件
import MainFooter from './components/footer';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
// 网站title多语言设置
import title from './i18n/title';

// 组件库样式
import 'packages/theme-chalk/src/index.scss';
import './demo-styles/index.scss';
import './assets/styles/common.css';
import './assets/styles/fonts/style.css';
// build/bin/iconInit.js 生成 挂载到Vue.prototype
// 用于icon文档页生成所有图标的集合
import icon from './icon.json';

Vue.use(Element);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

const globalEle = new Vue({
  data: { $isEle: false } // 是否 ele 用户
});

Vue.mixin({
  computed: {
    $isEle: {
      get: () => (globalEle.$data.$isEle),
      set: (data) => {globalEle.$data.$isEle = data;}
    }
  }
});

Vue.prototype.$icon = icon; // Icon 列表页用

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  // 组件文档 代码高亮展示
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'Element';
  ga('send', 'event', 'PageView', route.name);
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app');
