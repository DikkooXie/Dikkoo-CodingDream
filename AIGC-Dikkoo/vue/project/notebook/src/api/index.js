import axios from 'axios'
import { showToast } from 'vant'

// 设置默认请求地址
axios.defaults.baseURL = 'http://localhost:3000';
// 设置默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

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