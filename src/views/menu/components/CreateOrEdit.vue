<!--
 * @Author: cdw
 * @Date: 2021-05-08 10:39:49
 * @LastEditTime: 2021-05-08 14:48:41
 * @LastEditors: cdw
 * @Description: TODO
 * @FilePath: /edu-boss-fed/src/views/menu/components/CreateOrEdit.vue
-->
<template>
 <div class="createMenu">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{isEdit? '编辑菜单': '添加菜单'}}</span>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径">
        <el-input v-model="form.href"></el-input>
      </el-form-item>
      <el-form-item label="上家菜单">
        <el-select v-model="form.parentId" placeholder="请选择上级菜单">
          <el-option label="无上级菜单" :value="-1"></el-option>
          <el-option :label="item.name" :value="item.id" v-for="item in parentMenuList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="前端图标">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="是否展示">
        <el-radio-group v-model="form.shown">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.orderNum" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button v-if="!isEdit">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

 </div>
</template>

<script lang='ts'>
import vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'
export default vue.extend({
  name: 'MenuCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        parentId: -1, // 表示没有上级菜单
        name: '123',
        href: '123',
        icon: '123',
        orderNum: 0,
        description: '123',
        shown: true
      },
      parentMenuList: []
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async loadMenuInfo () {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      if (data.data.menuInfo) { this.form = data.data.menuInfo }
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
    },
    async onSubmit () {
      // 表单验证
      const { data } = await createOrUpdateMenu(this.form)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.back()
      } else {
        this.$message.error(data.mesg)
      }
    }

  }
})
</script>

<style lang='scss' scoped>

</style>
