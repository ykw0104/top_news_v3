<template>
  <div class="upload-cover" @click="showCoverSelect">
    <div class="cover-wrap">
      <img class="cover-image" ref="coverImage" />
    </div>

    <el-dialog v-model="dialogVisible" title="选择封面" width="30%">
      <!-- 标签 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">素材库</el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <!-- 上传图片的Tab -->
          <input ref="fileRef" type="file" @change="onFileChange" />
          <img ref="previewImage" width="100" alt="" />
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onCoverConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { uploadImage } from "../../../api/image";

import { ElMessage } from "element-plus";

export default defineComponent({
  name: "UploadCover",
  setup() {
    const dialogVisible = ref(false);
    const activeName = ref("first");
    const fileRef = ref(null);
    const previewImage = ref(null);
    const coverImage = ref(null);

    const showCoverSelect = () => {
      dialogVisible.value = true;
    };

    /* 选择上传图片 */
    const onFileChange = () => {
      // 获取文件对象
      const file = fileRef.value.files[0];

      // 图片预览
      const blob = window.URL.createObjectURL(file);
      previewImage.value.src = blob;

      // fileRef.value.value = ""; // 防止用户选择同一个文件不触发change事件
    };

    /* 确认按钮 */
    const onCoverConfirm = () => {
      // 如果tab是上传图片, 并且input file有选择文件,才执行上传图片的操作
      if (activeName.value === "second") {
        const file = fileRef.value.files[0];
        // 没有选择文件
        if (!file) {
          ElMessage("请选择文件");
          return;
        }
        /* 执行文件上传  */
        const fd = new FormData();
        fd.append("image", file);
        uploadImage(fd).then((res) => {
          // 关闭弹出层
          dialogVisible.value = false;
          // 展示上传的图片
          coverImage.value.src = res.data.data.url;
        });
      }
    };

    return {
      dialogVisible,
      activeName,
      fileRef,
      previewImage,
      coverImage,

      showCoverSelect,
      onFileChange,
      onCoverConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>
.cover-wrap {
  width: 150px;
  height: 120px;
  border: 1px solid #000;

  .cover-image {
    max-width: 100%;
    height: 120px;
  }
}
</style>
