/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 10:57:47
 * @LastEditors: vickiWu
 * @Description:使用 markdown-it-chain 配置markdown-it选项、插件和容器信息，初始化markdown-it实例。
 * @FilePath: \element\build\md-loader\config.js
 */
const Config = require('markdown-it-chain');
const anchorPlugin = require('markdown-it-anchor');
const slugify = require('transliteration').slugify;
const containers = require('./containers');
const overWriteFenceRule = require('./fence');

const config = new Config();

config
  .options.html(true).end() // 在源码中启动html标签

  .plugin('anchor').use(anchorPlugin, [
    {
      level: 2, // 最少渲染层级
      slugify: slugify, // 生成有效url
      permalink: true, // 标题旁加入永久链接
      permalinkBefore: true// 链接放在标题前面
    }
  ]).end()

  .plugin('containers').use(containers).end(); // 创建自定义容器解析插件

const md = config.toMd();
overWriteFenceRule(md);

module.exports = md;
