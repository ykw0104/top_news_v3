<template>
  <el-container class="layout-container">
    <!-- 1. 侧边栏 -->
    <el-aside class="aside" width="200px">
      <app-aside class="aside-menu" />
    </el-aside>

    <el-container>
      <!-- 2. 顶部 -->
      <el-header class="header">Header</el-header>
      <!-- 3. 主要显示区 -->
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppAside from "./components/aside.vue";

export default defineComponent({
  name: "LayoutIndex",
  components: {
    AppAside,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.layout-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .aside {
    background-color: #d3dce6;

    .aside-menu {
      height: 100%;
    }
  }

  .header {
    background-color: #b3c0d1;
  }

  .main {
    background-color: #e9eef3;
  }
}
</style>
