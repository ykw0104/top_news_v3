<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">
      <i class="el-icon-s-home"></i>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-files"></i>
      <template #title>内容管理</template>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-picture"></i>
      <template #title>素材管理</template>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-s-promotion"></i>
      <template #title>发布文章</template>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-s-comment"></i>
      <template #title>评论管理</template>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="el-icon-ice-cream"></i>
      <template #title>粉丝管理</template>
    </el-menu-item>
    <el-menu-item index="7">
      <i class="el-icon-setting"></i>
      <template #title>个人设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppAside",
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      handleOpen,
      handleClose,
    };
  },
});
</script>

<style lang="scss" scoped></style>
