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
      <!---------------------------- b. 内容 -------------------------------------------------------->
      <el-row>
        <!-- 第1列 -->
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
              <el-button type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 第2列 -->

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
          <input id="avatar-file" ref="avatarFile" type="file" hidden />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import { getUserProfile } from "../../api/user.js";

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
    // -----------------------------------------------------------
    /* 加载用户 */
    const loadUser = () => {
      getUserProfile().then((res) => {
        user.value = res.data.data;
      });
    };

    // ----------------------------------------------------------
    loadUser();
    return {
      user,
      avatarFile,
    };
  },
});
</script>

<style lang="scss" scoped>
.settings-avatar,
.avatar-edit {
  cursor: pointer;
}
</style>
