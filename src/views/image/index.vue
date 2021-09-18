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
        <el-radio-group
          v-model="collectRadio"
          size="mini"
          @change="loadImages(collectRadio)"
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
      </div>

      <!-- b2. 图片显示 -->
      <el-row :gutter="5">
        <el-col
          class="image-col"
          v-for="(image, index) in images"
          :key="index"
          :xs="12"
          :sm="6"
          :md="6"
          :lg="4"
          :xl="4"
        >
          <el-image
            style="height:100px"
            :src="image.url"
            fit="cover"
          ></el-image>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import { getImages } from "../../api/image";

export default defineComponent({
  name: "ImageIndex",
  setup() {
    // ----------------------------------------------------------------------

    const collectRadio = ref(false); // 默认查询全部
    const images = ref([]); // 图片数据
    // ----------------------------------------------------------------------
    /* 加载图片:collect: false(全部), true(收藏) */
    const loadImages = (collect = false) => {
      getImages({
        collect,
      }).then((res) => {
        images.value = res.data.data.results;
      });
    };
    // ----------------------------------------------------------------------
    loadImages(false); // 初始化加载图片

    return {
      images,
      collectRadio,

      loadImages,
    };
  },
});
</script>

<style lang="scss" scoped>
.image-col {
  margin-bottom: 1px;
}
</style>
