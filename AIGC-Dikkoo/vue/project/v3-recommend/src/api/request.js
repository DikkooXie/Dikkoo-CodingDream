import axios from 'axios';

export const service = axios.create({   // 创建axios单例, 进行全局配置
    baseURL: 'http://localhost:3003',   // 设置统一的基础url, index.js中的axios.get('/posts')会自动拼接
    timeout: 5000                       // 设置超时时间
})