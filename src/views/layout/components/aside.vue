<template>
  <el-menu
    :default-active="defaultActive"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
    :collapse="isCollapse"
  >
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-files"></i>
      <template #title>内容管理</template>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="el-icon-picture"></i>
      <template #title>素材管理</template>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="el-icon-s-promotion"></i>
      <template #title>发布文章</template>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="el-icon-s-comment"></i>
      <template #title>评论管理</template>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="el-icon-ice-cream"></i>
      <template #title>粉丝管理</template>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <template #title>个人设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "AppAside",
  props: ["isCollapse"],
  setup() {
    const route = useRoute();
    const defaultActive = ref("/");

    // 路由改变,导航菜单的高亮即default-active也随之改变
    watch(
      () => route.path,
      (newValue) => {
        defaultActive.value = newValue;
      },
      { immediate: true }
    );

    return {
      defaultActive,
    };
  },
});
</script>

<style lang="scss" scoped></style>
