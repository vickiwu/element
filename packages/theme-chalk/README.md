<!--
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 15:13:18
 * @LastEditors: vickiWu
 * @Description: 
 * @FilePath: \element\packages\theme-chalk\README.md
-->
# element-theme-chalk
> element component chalk theme.


## Installation
```shell
npm i element-theme-chalk -S
```

## Usage

Use Sass import
```css
@import 'element-theme-chalk';
```

Or Use webpack
```javascript
import 'element-theme-chalk';
```

Or
```html
<link rel="stylesheet" href="path/to/node_modules/element-theme-chalk/lib/index.css">
```

##  Import on demand
```javascript
import 'element-theme-chalk/lib/input.css';
import 'element-theme-chalk/lib/select.css';

// ...
```
# 目录结构

```text
├─lib --------------------------------------------打包输出目录
├─src---------------------------------------------样式文件
|   ├─reset.scss ---------------------------------重置浏览器的默认属性
|   ├─index.scss ---------------------------------样式入口文件
|   ├─base.scss ----------------------------------基础，引入动画，图标样式
|   ├─icon.scss ---------------------------------=图标样式
...
|   ├─button.scss --------------------------------组件对应单独的scss文件 
|   ├─input.scss ---------------------------------组件对应单独的scss文件 
...
├─mixins -----------------------------------------混入（mixin）定义
|   ├─config.scss --------------------------------变量
|   ├─function.scss ------------------------------自定义函数 @function
|   ├─mixins.scss --------------------------------支持接收参数
|   ├─utils.scss ---------------------------------公共样式
|   ├─_button.scss -------------------------------按钮公共样式
├─fonts ------------------------------------------字体图标
├─data-picker ------------------------------------日期选择器样式
├─common -----------------------------------------公共样式
|   ├─transition.scss ----------------------------动画
|   ├─var.scss -----------------------------------主题sass变量
├─gulpfile.js ------------------------------------gulp构建配置
├─package.json -----------------------------------包管理

