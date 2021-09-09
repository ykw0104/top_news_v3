<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <el-form
      ref="loginForm"
      class="login-form"
      :model="user"
      :rules="formRules"
    >
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox
          v-model="user.agree"
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
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

import { login } from "../../api/user.js";

export default defineComponent({
  name: "LoginIndex",

  setup() {
    const user = reactive({
      mobile: "13911111111", // 手机号码 13911111111
      code: "246810", // 验证码 246810
      agree: false, // 是否同意协议
    });

    const loginLoading = ref(false); //登录按钮是否显示加载

    const loginForm = ref(null); // 表单form对象

    // 自定义表单验证规则
    const formRules = reactive({
      // 表单验证
      mobile: [
        { required: true, message: "手机号不能为空", trigger: "change" },
        {
          pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
          message: "手机号格式不正确",
          trigger: "change",
        },
      ],
      code: [
        { required: true, message: "验证码不能为空", trigger: "change" },
        {
          pattern: /^\d{6}$/,
          message: "验证码格式不正确",
          trigger: "change",
        },
      ],
      agree: [
        {
          // 自定义校验规则
          validator: (rule, value, callback) => {
            if (value) {
              callback();
            } else {
              callback(new Error("勾选同意协议后才能登录"));
            }
          },
          trigger: "change",
        },
      ],
    });

    const router = useRouter();

    /* 登录操作 */
    const onLogin = () => {
      // 1. 表单验证
      loginForm.value.validate((valid) => {
        if (!valid) {
          return false; // 停止请求提交
        }

        // 2. 表单验证通过, 提交登录
        loginFn();
      });

      // 处理后端响应结果
    };

    /* 处理请求登录的方法 */
    const loginFn = () => {
      loginLoading.value = true; // 开启登录按钮加载显示
      // 调用login请求方法
      login(user)
        .then((res) => {
          // 成功提示消息
          ElMessage({
            message: "登录成功",
            type: "success",
            center: true,
            duration: 2000,
          });

          loginLoading.value = false; // 关闭登录按钮加载显示

          /* 登录成功,跳转首页 */
          router.push({
            name: "home",
          });
        })
        .catch((err) => {
          console.log("登录失败", err);

          // 失败提示消息
          ElMessage({
            message: "登录失败, 手机号或验证码错误",
            type: "error",
            center: true,
            duration: 2000,
          });

          loginLoading.value = false; // 关闭登录按钮加载显示
        });
    };

    return {
      user,
      loginLoading,
      formRules,
      loginForm,

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
