<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <el-form class="login-form" :model="user">
      <el-form-item>
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox
          v-model="checked"
          label="我已阅读并同意用户协议和隐私条款"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import request from "../../utils/request";

export default defineComponent({
  name: "LoginIndex",

  setup() {
    // 用户手机号和验证码
    const user = reactive({
      mobile: "13911111111", // 13911111111
      code: "246810", // 246810
    });
    // 同意协议
    const checked = ref(false);

    // 登录操作
    const onLogin = () => {
      // 获取表单验证

      // 验证通过, 提交登录
      request({
        method: "POST",
        url: "/mp/v1_0/authorizations",
        data: user,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("登录失败", err);
        });

      // 处理后端响应结果
    };

    return {
      user,
      checked,

      onLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: url("./login_bg.jpeg") no-repeat center/cover;

  .login-form {
    min-width: 300px;
    padding: 50px;
    margin-bottom: 100px;
    background-color: #fff;

    .login-btn {
      width: 100%;
    }
  }
}
</style>
