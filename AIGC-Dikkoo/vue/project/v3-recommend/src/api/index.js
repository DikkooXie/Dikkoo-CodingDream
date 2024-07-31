// 所有的接口请求都在这里
import { service } from './request.js'; // 导入axios实例: service

// 获取文章列表
export const getPosts = () => {
    return service.get('/posts')
}

// 按文章ID获取文章详情
export const getPostById = (id) => {
    return service.get(`/posts/${id}`)
}

// 相关文章推荐
export const getRecommendPosts = (id) => {
    // return service.get(`/posts/${id}/recommend`)
}