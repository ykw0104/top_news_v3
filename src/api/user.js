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

// 获取用户信息
export const getUserProfile = () => {
  return request({
    method: "GET",
    url: "/mp/v1_0/user/profile",
  });
};

// 修改用户信息
export const updateUserInfo = () => {};

// 修改用户头像
// photo必须传递FormData对象
export const updateUserPhoto = (photo) => {
  return request({
    method: "PATCH",
    url: "/mp/v1_0/user/photo",
    data: photo,
  });
};
