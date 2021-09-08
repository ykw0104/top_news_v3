/**
 * 基于axios的请求
 */
import axios from 'axios'

/* 创建实例 */
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
})

/* 请求拦截 */

/* 响应拦截 */

export default request