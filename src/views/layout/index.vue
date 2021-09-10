<template>
  <el-container class="layout-container">
    <!-- 1. 侧边栏 -->
    <el-aside class="aside" width="200px">
      <app-aside class="aside-menu" />
    </el-aside>

    <el-container>
      <!-- 2. 顶部 -->
      <el-header class="header">
        <!-- 2.1 顶部左侧 -->
        <div class="header-left">
          <i class="header-left-icon el-icon-s-fold"></i>
          <span class="header-desc">欲寄彩笺兼尺素,山长水阔知何处</span>
        </div>
        <!-- 2.2 顶部右侧 -->
        <el-dropdown class="header-right">
          <div class="avatar-wrap">
            <img
              class="avatar"
              src="https://img2.baidu.com/it/u=3422481151,3897337691&fm=26&fmt=auto"
              alt=""
            />
            <span>用户昵称</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;

    .header-left {
      .header-left-icon {
        color: #606266;
        font-size: 22px;
      }

      .header-desc {
        font-family: "hangkai";
        font-size: 22px;
      }
    }

    .header-right {
      .avatar-wrap {
        display: flex;
        align-items: center;

        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          border-radius: 50%;
        }
      }
    }
  }

  .main {
    background-color: #e9eef3;
  }
}
</style>
