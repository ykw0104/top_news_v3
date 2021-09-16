/**
 * 基于axios的请求
 */
import axios from "axios";
import JSONbig from "json-bigint";

/* 创建实例 */
const request = axios.create({
  baseURL: "http://api-toutiao-web.itheima.net",
  // 定制后端返回的原始数据的处理
  transformResponse: [
    function(data) {
      try {
        return JSONbig.parse(data); // JSONbig来处理, 防止id的长度过长产生精度不对的问题
        // return JSON.parse(data); // axios默认的处理
      } catch (error) {
        console.log("JSONbig转换失败", error);
        return data;
      }
    },
  ],
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
