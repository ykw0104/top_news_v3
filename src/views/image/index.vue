<template>
  <div class="image-container">
    <el-card class="box-card">
      <template #header>
        <div>
          <!---------------------------- a. 面包屑路径导航 ------------------------------------>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>素材管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <!-- b. 图片列表 -->
      <image-list />
    </el-card>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import ImageList from "./components/image-list.vue";

export default defineComponent({
  name: "ImageIndex",
  components: { ImageList },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
