/**
 *  用户请求模块
 */

import request from "@/utils/request.js";

// 用户登录
export const login = (user) => {
  return request({
    method: "POST",
    url: "/mp/v1_0/authorizations",
    data: user,
  });
};

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjI3MDg4NDksInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.jWqD-M1XPSlLuOBNb8PoENdiI3QCIV4VduOGqApFR_Y";

// 获取用户信息
export const getUserProfile = () => {
  return request({
    method: "GET",
    url: "/mp/v1_0/user/profile",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 修改用户信息
export const updateUserInfo = () => {};
