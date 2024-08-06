import axios from 'axios'
import { showToast } from 'vant'

// 设置默认请求地址
axios.defaults.baseURL = 'http://localhost:3000';
// 设置默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

// 请求拦截器
axios.interceptors.request.use(req => { // 在发送请求之前做些什么
    // 读取用户 token
    const token = localStorage.getItem('token');

    if(token) { // 如果有 token 则添加到请求头
        req.headers.Authorization = token;
    }
    
    return req; // 返回请求
}, error => {
    // 异常处理
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(res => {
    if(res.status !== 200) {
        showToast('服务器异常，请稍后再试 >.<');
        return Promise.reject(res);
    } else if(res.data.code !== '800') {
        // 业务异常，逻辑错误
        showToast(res.data.msg);
        return Promise.reject(res);
    } else {
        return res.data;
    }
});

export default axios;