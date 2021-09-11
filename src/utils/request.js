/**
 * 基于axios的请求
 */
import axios from "axios";

/* 创建实例 */
const request = axios.create({
  baseURL: "http://api-toutiao-web.itheima.net",
});

/* 请求拦截 */
request.interceptors.request.use(
  function(config) {
    const user = JSON.parse(window.localStorage.getItem("user"));
    // 统一设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

/* 响应拦截 */

export default request;
