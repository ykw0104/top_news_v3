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

/* 获取文章频道 */
export const getArticlesChannels = () => {
  return request({
    method: "GET",
    url: "/mp/v1_0/channels",
  });
};

/* 删除文章 */
export const deleteArticle = (articleId) => {
  return request({
    method: "DELETE",
    url: `/mp/v1_0/articles/${articleId}`,
  });
};
