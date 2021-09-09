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
        <el-button
          class="login-btn"
          type="primary"
          :loading="loginLoading"
          @click="onLogin"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ElMessage } from "element-plus";

import request from "../../utils/request";

export default defineComponent({
  name: "LoginIndex",

  setup() {
    const user = reactive({
      mobile: "13911111111", // 手机号码 13911111111
      code: "246810", // 验证码 246810
    });
    const checked = ref(false); // 同意协议
    const loginLoading = ref(false); //登录按钮是否显示加载

    // 登录操作
    const onLogin = () => {
      // 1. 获取表单验证

      // 2. 验证通过, 提交登录
      loginLoading.value = true; // 开启登录按钮加载显示
      request({
        method: "POST",
        url: "/mp/v1_0/authorizations",
        data: user,
      })
        .then((res) => {
          console.log(res);

          // 成功提示消息
          ElMessage({
            message: "登录成功",
            type: "success",
            center: true,
            duration: 2000,
          });

          loginLoading.value = false; // 关闭登录按钮加载显示
        })
        .catch((err) => {
          console.log("登录失败", err);

          // 失败提示消息
          ElMessage({
            message: "登录失败, 手机号或验证码错误1",
            type: "error",
            center: true,
            duration: 2000,
          });

          loginLoading.value = false; // 关闭登录按钮加载显示
        });

      // 处理后端响应结果
    };

    return {
      user,
      checked,
      loginLoading,

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
