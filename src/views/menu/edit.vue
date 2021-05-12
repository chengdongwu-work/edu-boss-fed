<!--
 * @Author: cdw
 * @Date: 2021-05-08 10:39:49
 * @LastEditTime: 2021-05-08 14:36:10
 * @LastEditors: cdw
 * @Description: TODO
 * @FilePath: /edu-boss-fed/src/views/menu/edit.vue
-->
<template>
 <div class="createMenu">
   <create-or-edit :isEdit="true"/>
 </div>
</template>

<script lang='ts'>
import vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'
export default vue.extend({
  name: 'CreateMenu',
  data () {
    return {
    }
  },
  components: {
    CreateOrEdit
  }
})
</script>

<style lang='scss' scoped>

</style>
