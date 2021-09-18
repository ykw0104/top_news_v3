/**
 * 图片请求模块
 */
import request from "@/utils/request.js";

/* 获取文章列表 */
export const getImages = (image) => {
  return request({
    method: "GET",
    url: "/mp/v1_0/user/images",
    params: image,
  });
};
