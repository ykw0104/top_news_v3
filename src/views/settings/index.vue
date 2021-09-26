<template>
  <div class="settings-container">
    <el-card class="box-card">
      <template #header>
        <!---------------------------- a. 面包屑路径导航 -------------------------------------------------------->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </template>

      <el-row>
        <!---------------------------- b. 内容 -------------------------------------------------------->
        <el-col :span="16">
          <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="编号">
              {{ user.id }}
            </el-form-item>
            <el-form-item label="手机">
              {{ user.mobile }}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input v-model="user.intro" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :loading="updateUserProfileLoading"
                @click="onUpdateUser"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <!----------------------------- c. 图片头像裁切  ----------------------------------------------->
        <el-col :offset="2" :span="4">
          <label for="avatar-file">
            <el-avatar
              class="settings-avatar"
              shape="square"
              :size="150"
              fit="cover"
              :src="user.photo"
            />
            <p class="avatar-edit">点击修改头像</p>
          </label>
          <!-- <p class="avatar-edit" @click="avatarFile.click()">点击修改头像</p> -->

          <!-- 隐藏input, 用上面的label绑定这里的input -->
          <input
            id="avatar-file"
            ref="avatarFile"
            type="file"
            hidden
            @change="onFileChange"
          />
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      title="修改头像"
      width="30%"
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div class="preview-image-wrap">
        <img class="preview-image" ref="previewImageRef" :src="previewImage" />
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onUpdatePhoto">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import {
  getUserProfile,
  updateUserPhoto,
  updateUserProfile,
} from "../../api/user.js";

import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

import { ElMessage } from "element-plus";

import mitter from "../../utils/eventbus";

export default defineComponent({
  name: "SettingsIndex",
  setup() {
    const user = ref({
      email: "",
      id: null,
      intro: "",
      mobile: "",
      name: "",
      photo: "",
    });
    const avatarFile = ref(null);
    const dialogVisible = ref(false); // 控制上传图片裁切预览的显示状态
    const previewImage = ref(""); // 保存预览图片的src
    const previewImageRef = ref(null); // 预览图片的ref
    const cropper = ref(null); // Cropper裁切器实例对象
    const updateUserProfileLoading = ref(false); // 更新用户加载中
    // -----------------------------------------------------------
    /* 加载用户 */
    const loadUser = () => {
      getUserProfile().then((res) => {
        user.value = res.data.data;
      });
    };

    /* <input type="file">添加文件时触发 */
    const onFileChange = () => {
      // 处理图片预览, 添加的图片赋值给previewImage, 再把previewImage绑定到img的src标签里
      previewImage.value = window.URL.createObjectURL(
        avatarFile.value.files[0]
      );
      // 展示弹出层, 预览用户选择的图片
      dialogVisible.value = true;
      avatarFile.value.value = ""; // 解决选择相同文件不触发 change事件的问题
    };

    /* dialog框完全打开时触发 */
    const onDialogOpened = () => {
      // c2. 下次可以加载其他图片 方式一: replace方法
      // if (cropper.value) {
      //   cropper.value.replace(previewImage.value);
      //   return;
      // }

      // c1. 创建cropper实例
      cropper.value = new Cropper(previewImageRef.value, {
        aspectRatio: 1 / 1,
        viewMode: 1,
        dragMode: "none",
      });
    };

    /* dialog框完全关闭时触发 */
    const onDialogClosed = () => {
      // c2. 下次可以加载其他图片 方式二: 销毁裁切器,
      cropper.value.destroy();
    };

    /* 更新头像 */
    const onUpdatePhoto = () => {
      // c3. 获取裁切图片对象并提交
      cropper.value.getCroppedCanvas().toBlob((img) => {
        const formData = new FormData();
        formData.append("photo", img); // photo是接口文档里指定的
        //请求提交formData
        return updateUserPhoto(formData).then((res) => {
          dialogVisible.value = false; // 关闭对话框
          // user.value.photo = res.data.data.photo; // 更新页面的头像, 服务端返回有点慢
          user.value.photo = window.URL.createObjectURL(img); // 更新页面的头像

          mitter.emit("update-user", user.value); // 用户同步到layout的用户头像
        });
      });
    };

    /* 更新用户信息 */
    const onUpdateUser = () => {
      // 表单验证(忽略)
      // 表单验证通过,提交表单
      updateUserProfileLoading.value = true;
      updateUserProfile({
        name: user.value.name,
        intro: user.value.intro,
        email: user.value.email,
      }).then((res) => {
        ElMessage({
          message: "用户信息更新成功",
          type: "success",
        });
        updateUserProfileLoading.value = false;

        mitter.emit("update-user", user.value); // 用户同步到layout的的用户昵称
      });
    };
    // ----------------------------------------------------------
    loadUser();
    return {
      user,
      avatarFile,
      dialogVisible,
      previewImage,
      previewImageRef,
      updateUserProfileLoading,

      onFileChange,
      onDialogOpened,
      onDialogClosed,
      onUpdatePhoto,
      onUpdateUser,
    };
  },
});
</script>

<style lang="scss" scoped>
.settings-avatar,
.avatar-edit {
  cursor: pointer;
}

.preview-image-wrap {
  .preview-image {
    display: block;
    max-width: 100%;
    height: 250px;
    margin: 0 auto;
  }
}
</style>
