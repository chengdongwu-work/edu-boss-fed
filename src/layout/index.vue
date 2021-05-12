<!--
 * @Author: cdw
 * @Date: 2021-05-06 10:42:35
 * @LastEditTime: 2021-05-06 14:34:11
 * @LastEditors: cdw
 * @Description: TODO
 * @FilePath: /edu-boss-fed/src/layout/index.vue
-->
<template>
  <el-container>
    <el-aside width="200px">
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>
        <app-header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'
export default Vue.extend({
  name: 'Lauout',
  components: {
    AppAside,
    AppHeader
  }
})
</script>

<style lang='scss' scoped>
.el-container{
  min-height: 100vh;
  min-width: 980px;
}
.el-aside{
  background: #d3dce6;
}
.el-header{
  background: #fff;
}
</style>
