/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-24 18:19:04
 * @LastEditors: vickiWu
 * @Description:
 * @FilePath: \element\build\bin\gen-indices.js
 */
'use strict';
// 执行文件node build/bin/gen-indices.js,提供 algoliasearch 搜索功能，需要把 examples/docs 目录下 .md 文件内容格式化后上传 algolia,
// 使用algoliasearch实现文档全局搜索
const fs = require('fs');
const path = require('path');
const algoliasearch = require('algoliasearch');
const slugify = require('transliteration').slugify;// 中文转拼音
const key = require('./algolia-key'); // 获取KEY 用来管理云端数据 项目中未上传此文件
// 初始化algoliasearch服务
const client = algoliasearch('4C63BTGP6S', key);
// 多语言映射关系
const langs = {
  'zh-CN': 'element-zh',
  'en-US': 'element-en',
  'es': 'element-es',
  'fr-FR': 'element-fr'
};
// 将examples/docs/{lang}下的.md文件内容，按照约定格式上传给algoliasearch
['zh-CN', 'en-US', 'es', 'fr-FR'].forEach(lang => {
  // 获取当前语言的文件夹名称
  const indexName = langs[lang];
  // 初始化一个索引库
  const index = client.initIndex(indexName);
  // 清除索引
  index.clearIndex(err => {
    if (err) return;
    // 获取文件列表
    fs.readdir(path.resolve(__dirname, `../../examples/docs/${ lang }`), (err, files) => {
      if (err) return;
      let indices = [];
      files.forEach(file => {
        // 获取组件名称
        const component = file.replace('.md', '');
        // 读取组件文档内容
        const content = fs.readFileSync(path.resolve(__dirname, `../../examples/docs/${ lang }/${ file }`), 'utf8');
        // 内容页面提取，移除自定义容器 ::: demo 、 ```内容
        // 提取h2 H3 标题和描述内容，输入格式如下
        //  [
        //    ['## Button 按钮\r']
        //  ]
        const matches = content
          .replace(/:::[\s\S]*?:::/g, '')
          .replace(/```[\s\S]*?```/g, '')
          .match(/#{2,4}[^#]*/g)
          .map(match => match.replace(/\n+/g, '\n').split('\n').filter(part => !!part))
          .map(match => {
            const length = match.length;
            if (length > 2) {
              const desc = match.slice(1, length).join('');
              return [match[0], desc];
            }
            return match;
          });
        // 将匹配内容格式化
        indices = indices.concat(matches.map(match => {
          const isComponent = match[0].indexOf('###') < 0;
          const title = match[0].replace(/#{2,4}/, '').trim();
          const index = { component, title };
          index.ranking = isComponent ? 2 : 1;
          index.anchor = slugify(title);
          index.content = (match[1] || title).replace(/<[^>]+>/g, '');
          return index;
        }));
      });
      // 索引中添加新信息
      index.addObjects(indices, (err, res) => {
        console.log(err, res);
      });
    });
  });
});
