<template>
  <div class="image-list">
    <div class="img-radio">
      <!-- b1. 按钮组 -->
      <el-radio-group
        v-model="collectRadio"
        size="mini"
        @change="loadImages(1)"
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
        class="image-item"
        v-for="(image, index) in images"
        :key="index"
        :xs="12"
        :sm="6"
        :md="6"
        :lg="4"
        :xl="4"
      >
        <el-image style="height:100px" :src="image.url" fit="cover"></el-image>

        <div class="img-action">
          <el-button
            :icon="image.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            type="warning"
            circle
            size="mini"
            :loading="image.loading"
            @click="onCollect(image)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            :loading="image.loading"
            @click="onDelete(image)"
          />
        </div>
      </el-col>
    </el-row>

    <!-- b3. 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :total="totalCount"
      :page-size="pageSize"
      v-model:current-page="currentPage"
      @current-change="onPageChange"
    />

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

import { getImages, collectImage, deleteImage } from "../../../api/image";

import { ElMessage } from "element-plus";

export default defineComponent({
  name: "ImageListIndex",
  setup() {
    // ----------------------------------------------------------------------
    const collectRadio = ref(false); // 默认查询全部
    const images = ref([]); // 图片数据
    const totalCount = ref(0); // 图片总数
    const pageSize = ref(24); // 每页显示多少条
    const currentPage = ref(1); // 当前页码
    const dialogUploadVisible = ref(false); // 控制上传素材的弹框
    // 设置el-upload上传需要的头部信息
    const uploadHeaders = ref({
      Authorization: `Bearer ${
        JSON.parse(window.localStorage.getItem("user")).token
      }`,
    });
    // ----------------------------------------------------------------------
    /* 加载图片:collect: false(全部), true(收藏) */
    const loadImages = (page = 1) => {
      currentPage.value = page; // 防止请求页的数据和页码不对应
      // 请求图片
      getImages({
        collect: collectRadio.value,
        page,
        per_page: pageSize.value,
      }).then((res) => {
        const results = res.data.data.results; // 获取结果
        results.forEach((img) => {
          img.loading = false; // 手动添加按钮的loading效果
        });
        images.value = results; // 保存图片数据

        totalCount.value = res.data.data.total_count;
      });
    };

    /* 图片上传成功后的操作 */
    const onUploadSuccess = (isCollected) => {
      dialogUploadVisible.value = false; // 关闭上传弹框
      loadImages(currentPage.value); // 更新列表

      ElMessage.success({
        message: "上传成功",
        type: "success",
      });
    };

    /* 分页的页码改变时 */
    const onPageChange = (page) => {
      loadImages(page);
    };

    /* 图片收藏处理 */
    const onCollect = (image) => {
      image.loading = true; // 开启收藏按钮的loading
      // 图片收藏或取消收藏
      collectImage(image.id, !image.is_collected).then((res) => {
        image.is_collected = !image.is_collected; // 页面上的视图更新
        image.loading = false; // 关闭收藏按钮的loading
      });
    };

    /* 图片删除处理 */
    const onDelete = (image) => {
      image.loading = true; // 开启删除按钮的loading
      deleteImage(image.id).then((res) => {
        loadImages(currentPage.value);
        image.loading = false; // 关闭删除按钮的loading
      });
    };
    // ----------------------------------------------------------------------
    loadImages(1); // 初始化加载图片

    return {
      images,
      totalCount,
      pageSize,
      currentPage,
      collectRadio,
      dialogUploadVisible,
      uploadHeaders,

      loadImages,
      onUploadSuccess,
      onPageChange,
      onCollect,
      onDelete,
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

.image-item {
  position: relative;
  margin-bottom: 1px;

  .img-action {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    bottom: 4px;
    left: 2px;
    right: 2px;
    height: 40px;
    font-size: 24px;
    color: #fff;
    background-color: rgba(204, 204, 204, 0.4);
  }
}
</style>
