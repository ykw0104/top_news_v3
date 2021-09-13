/**
 * 文章请求模块
 */
import request from "@/utils/request.js";

/* 获取文章列表 */
export const getArticles = (articleQueryData) => {
  return request({
    method: "GET",
    url: "/mp/v1_0/articles",
    params: articleQueryData,
  });
};
