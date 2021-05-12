<!--
 * @Author: cdw
 * @Date: 2021-05-06 10:09:02
 * @LastEditTime: 2021-05-07 10:35:48
 * @LastEditors: cdw
 * @Description: TODO
 * @FilePath: /edu-boss-fed/src/views/login/index.vue
-->
<template>
 <div class="login">
  <el-form ref="form" class="login-form" :model="form" label-width="80px" label-position="top" :rules="rules">
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" @click="onSubmit" :loading="isLoginLoading">登陆</el-button>
    </el-form-item>
  </el-form>
 </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { login } from '@/services/user'
import qs from 'qs'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      isLoginLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.isLoginLoading = true
        // 1. 表单验证
        await (this.$refs.form as Form).validate()
        // 2. 验证通过 -> 提交表单
        const { data } = await login(this.form)
        // const { data } = await request({
        //   method: 'POST',
        //   url: '/front/user/login',
        //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //   data: qs.stringify(this.form)
        // })
        this.isLoginLoading = false
        console.log(data)

        // 3. 处理请求结果
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          this.$store.commit('setUser', data.content)
          // 登陆成功需要能够全局访问(放到vuex容器中)
          // 访问需要登陆的页面判断(router拦截器)
          // this.$router.push({
          //   name: 'home'
          // })
          this.$router.push(this.$route.query.redirect as string || '/')
          this.$message.success('登陆成功')
        }
        this.isLoginLoading = false
      } catch (error) {
        console.log('登陆失败', error)
        this.isLoginLoading = false
      }
    }
  }
})
</script>

<style lang='scss' scoped>
.login{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form{
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn{
    width: 100%;
  }
}
</style>
