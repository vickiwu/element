<!--
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-03-25 16:25:28
 * @LastEditors: vickiWu
 * @Description: 组件库开发中的功能展示入口文件 
 * @FilePath: \element\examples\play\index.vue
-->
<template>
  <div style="margin: 20px">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: 'Hello Element UI!'
    };
  }
};
</script>
