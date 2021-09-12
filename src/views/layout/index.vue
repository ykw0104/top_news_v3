<template>
  <el-container class="layout-container">
    <!-- 1. 侧边栏 -->
    <el-aside class="aside" width="auto">
      <app-aside class="aside-menu" :isCollapse="isCollapse" />
    </el-aside>

    <el-container>
      <!-- 2. 顶部 -->
      <el-header class="header">
        <!-- 2.1 顶部左侧 -->
        <div class="header-left">
          <i
            class="header-left-icon"
            :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
            @click="isCollapse = !isCollapse"
          ></i>
          <span class="header-desc">欲寄彩笺兼尺素,山长水阔知何处</span>
        </div>
        <!-- 2.2 顶部右侧 -->
        <el-dropdown class="header-right">
          <div class="avatar-wrap">
            <img class="avatar" src="./login-avatar.jpeg" alt="" />
            <span>{{ layoutState.user.name }}</span>
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
import { defineComponent, reactive, ref } from "vue";

import AppAside from "./components/aside.vue";
import { getUserProfile } from "../../api/user.js";

export default defineComponent({
  name: "LayoutIndex",
  components: {
    AppAside,
  },
  setup() {
    const layoutState = reactive({
      user: {}, // 用户信息
    });
    const isCollapse = ref(false);

    /* 请求用户信息 */
    getUserProfile().then((res) => {
      layoutState.user = res.data.data;
    });

    return {
      layoutState,
      isCollapse,
    };
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
    overflow-y: hidden;
    background-color: #d3dce6;
    // transition: all 0.3s ease;

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
