/**
 * 图片请求模块
 */
import request from "@/utils/request.js";

export const uploadImage = (image) => {
  return request({
    method: "POST",
    url: "/mp/v1_0/user/images",
    data: image,
  });
};

/* 获取图片列表 */
export const getImages = (image) => {
  return request({
    method: "GET",
    url: "/mp/v1_0/user/images",
    params: image,
  });
};

/* 收藏/取消收藏图片列表 */
export const collectImage = (imageId, isCollect) => {
  return request({
    method: "PUT",
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect: isCollect,
    },
  });
};

/* 删除图片 */
export const deleteImage = (imageId) => {
  return request({
    method: "DELETE",
    url: `/mp/v1_0/user/images/${imageId}`,
  });
};
