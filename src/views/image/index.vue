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
      <div class="img-radio">
        <!-- b1. 按钮组 -->
        <el-radio-group
          v-model="collectRadio"
          size="mini"
          @change="loadImages(collectRadio)"
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>

        <el-button
          class="img-radio-right"
          size="mini"
          type="success"
          @click="dialogUploadVisible = true"
          >上传素材</el-button
        >
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

    <!---------------------------- 上传素材的弹出框 ------------------------------------>
    <el-dialog
      title="上传素材"
      v-model="dialogUploadVisible"
      :append-to-body="true"
      top="30vh"
    >
      <!-- 上传图片 -->
      <!-- el-upload会自己发请求 -->
      <el-upload
        class="upload-image"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        method="POST"
        :headers="uploadHeaders"
        name="image"
        multiple
        :show-file-list="false"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            只能上传 jpg/png 文件，且不超过 500kb
          </div>
        </template>
      </el-upload>
    </el-dialog>
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
    const dialogUploadVisible = ref(false); // 控制上传素材的弹框
    const uploadHeaders = ref({
      Authorization: `Bearer ${
        JSON.parse(window.localStorage.getItem("user")).token
      }`,
    });
    // ----------------------------------------------------------------------
    /* 加载图片:collect: false(全部), true(收藏) */
    const loadImages = (collect = false) => {
      getImages({
        collect,
      }).then((res) => {
        images.value = res.data.data.results;
      });
    };

    /* 图片上传成功后的操作 */
    const onUploadSuccess = () => {
      dialogUploadVisible.value = false; // 关闭上传弹框
      loadImages(false); // 更新列表
    };
    // ----------------------------------------------------------------------
    loadImages(false); // 初始化加载图片

    return {
      images,
      collectRadio,
      dialogUploadVisible,
      uploadHeaders,

      loadImages,
      onUploadSuccess,
    };
  },
});
</script>

<style lang="scss" scoped>
.img-radio {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;

  .img-radio-right {
    margin-right: 10px;
  }
}

.image-col {
  margin-bottom: 1px;
}
</style>
