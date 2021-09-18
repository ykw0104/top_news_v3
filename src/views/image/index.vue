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
      <!---------------------------- b. 图片内容部分 ------------------------------------>
      <div style="padding-bottom: 20px;">
        <!-- b1. 按钮组 -->
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
      <!-- b2. 图片显示 -->
      <el-row :gutter="5">
        <el-col
          v-for="n in 8"
          :xs="12"
          :sm="6"
          :md="6"
          :lg="4"
          :xl="4"
          style="margin-bottom:1px;"
        >
          <el-image
            style="height:100px"
            src="https://img1.baidu.com/it/u=1802385373,863253983&fm=26&fmt=auto"
            fit="cover"
          ></el-image>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ImageIndex",
  setup() {
    const radio1 = ref("全部");

    return {
      radio1,
    };
  },
});
</script>

<style lang="scss" scoped></style>
