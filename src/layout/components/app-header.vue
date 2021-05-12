<!--
 * @Author: cdw
 * @Date: 2021-05-06 14:26:12
 * @LastEditTime: 2021-05-07 17:11:29
 * @LastEditors: cdw
 * @Description: TODO
 * @FilePath: /edu-boss-fed/src/layout/components/app-header.vue
-->
<template>
 <div class="header">
   <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="40" :src="userInfo.portrait || require('../../assets/default-avatar.png')"></el-avatar>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
      <el-dropdown-item divided @click.native="handelLogOut">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
 </div>
</template>

<script lang='ts'>
import vue from 'vue'
import { getUserInfo } from '@/services/user'

export default vue.extend({
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
      console.log('loadUser')
    },
    handelLogOut () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      // 清除登陆状态
        this.$store.commit('setUser', null)
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
})
</script>

<style lang='scss' scoped>
.header{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link{
    display: flex;
    align-items: center;
  }
}
</style>
