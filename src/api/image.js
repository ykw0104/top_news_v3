/**
 * 图片请求模块
 */
import request from "@/utils/request.js";

/* 获取图片列表 */
export const getImages = (image) => {
  return request({
    method: "GET",
    url: "/mp/v1_0/user/images",
    params: image,
  });
};

/* 收藏图片列表 */
export const collectImage = (imageId, isCollect) => {
  return request({
    method: "PUT",
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect: isCollect,
    },
  });
};
