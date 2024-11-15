<template>
  <div>
    <div v-if="isAdmin">
      <MyResource></MyResource> <!-- 管理员资源组件 -->  
    </div>
    <div v-else>
      <UserResource></UserResource> <!-- 用户资源组件 -->  
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import MyResource from './MyResource.vue';
import UserResource from './UserResource.vue';
export default {
  components: { MyResource, UserResource },
  computed: {
    isAdmin() {
      return Vue.prototype.$globalVar.admin === 1 // 检查是否为管理员  
    }
  }
}
</script>

<style>

</style>