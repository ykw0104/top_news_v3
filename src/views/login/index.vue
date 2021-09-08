<template>
  <div class="login-container">
    <!-- 表单 -->
    <el-form :model="user" label-width="80px">
      <el-form-item label="手机号">
        <el-input v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="user.code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "LoginIndex",

  setup() {
    const user = reactive({
      mobile: "13911111111",
      code: "246810",
    });

    const onSubmit = () => {
      console.log(1111);
    };

    return {
      user,

      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped></style>
