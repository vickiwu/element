<!--
 * @Author: vickiWu
 * @Date: 2022-03-25 15:58:27
 * @LastEditTime: 2022-03-25 16:26:58
 * @LastEditors: vickiWu
 * @Description: 网站
 * @FilePath: \element\examples\README.md
-->

# 目录结构

```text
├─entry.js ---------------------------------------网站入口文件
├─app.vue ----------------------------------------根组件
├─bus.js -----------------------------------------事件总线（EventBus）用于组件之间的数据通讯
├─color.js -----------------------------------------调整颜色亮度
├─favicon.ico -----------------------------------------
├─icon.json -----------------------------------------icon名称数组 由build/bin/iconInit.js生成
├─index.tpl -----------------------------------------webpack.demo.js打包生成网站时页面依赖文件模板
├─nav.config.json ------------------------------------网站左侧菜单导航
├─route.config.js --------------------------------------网站路由配置
├─util.js -----------------------------------------公共方法，用于页面内容提取 demo-block.vue
├─versions.json -------------------------------------版本号管理，供导航头部版本切换
├─play-------------------------------------------组件演示
|   ├─index.vue 
├─pages-------------------------------------------网站模板配置以及生成多语言页面
├─i18n--------------------------------------------国际化
├─extension-------------------------------------------主题编译器，chrome插件
├─element-ui-------------------------------------------项目静态网站打包输出目录
├─dom-------------------------------------------定义了dom class 操作方法
|   ├─class.js 
├─docs-----------------------------------------组件文档目录，默认提供四种语言的文档
|   ├─demo-styles ------------------------------组件页面中 组件demo样式 
|   ├─components --------------------------------官网项目存放一些全局组件的目录
|   ├─assets ------------------------------------静态资源目录

```
创建新组件时， 运行build/bin/new.js文件更新 nav.config.json，添加新组件导航信息,更新至{"name": "组件","groups": [...]} 。
