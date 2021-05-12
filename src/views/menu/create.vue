<!--
 * @Author: cdw
 * @Date: 2021-05-08 10:39:49
 * @LastEditTime: 2021-05-08 14:35:33
 * @LastEditors: cdw
 * @Description: TODO
 * @FilePath: /edu-boss-fed/src/views/menu/create.vue
-->
<template>
 <div class="createMenu">
   <create-or-edit/>
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
