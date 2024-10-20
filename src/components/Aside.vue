<template>
  <div class="sd">
    <el-aside :span="12">
      <h5 id="title">青藤工作室招新网</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1" @click="handleChange('change','Introduction')">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>简介</span>
          </template>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>应用</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              index="2-1"
              @click="handleChange('change','Examine')"
              >考核</el-menu-item
            >
            <el-menu-item index="2-2" @click="handleChange('change','Resources')">资源</el-menu-item>
            <el-menu-item index="/MyResource" @click="handleChange('change','MyResource')">管理员资源</el-menu-item>
            <el-menu-item index="/UserResource" @click="handleChange('change','UserResource')">用户资源</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="3" @click="handleChange('change','User')">
          <i class="el-icon-user"></i>
          <span slot="title">用户</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
     
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    //url跳转路由名，不要加斜杠，name为触发事件名
    handleChange(name,url) {
      this.$bus.$emit(name, url);
    },
    
  },
};
</script>

<style>
#title {
  color: #2ba257;
  font-size: 24px;
}
/* 设置导航栏伪元素隐藏滚动条 */
.el-aside::-webkit-scrollbar {
  display: none;
}
</style>