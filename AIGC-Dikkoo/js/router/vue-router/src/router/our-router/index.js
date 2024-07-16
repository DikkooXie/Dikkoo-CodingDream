import RouterLink from './RouterLink.vue'
import RouterView from './RouterView.vue'
import { ref, inject } from 'vue';

/**
 * 创建路由实例
 * 为什么要包一个函数，而不直接暴露 Router 类呢？
 * 这是单例模式的一种实现方式，可以确保只有一个 Router 实例
 * @param {Object} options
 * @returns {Router} 
 */
export const createRouter = (options) => {
    return new Router(options);
};

/**
 * 创建 hash 模式的路由
 * @returns 
 */
export const createHashHistory = () => {
    function bindEvents(fn) {
        window.addEventListener('hashchange', fn);
    }
    return {
        url: window.location.hash.slice(1) || '/',
        bindEvents
    }
};

// 标记 router 要向下传递
const ROUTER_KEY = '__router__'; // 一个配置项，provide/inject 的Key

/**
 * 获取 Router 实例
 * use开头的函数是一派 hooks 函数式编程
 * @returns {Router} 返回 Router 实例
 */
export const useRouter = () => {
    return inject(ROUTER_KEY);
};

class Router {
    constructor(options) {
        this.history = options.history;
        this.routes = options.routes;
        this.current = ref(this.history.url);
        this.history.bindEvents(()=>{   // 箭头函数无this, this 指向 Router 实例
            console.log('hash changed');
            this.current.value = window.location.hash.slice(1) || '/';
        });
    };

    // Vue 的 use() 方法会调用 install 方法
    install(app) { // app 就是 Vue 的实例，上面有 component、directive、mixin、use 等方法
        // console.log('Router install', app);
        // 注册全局组件
        app.component('router-link', RouterLink);
        app.component('router-view', RouterView);
        // 全局声明ROUTER_KEY，将当前 Router 实例传递给所有子孙组件
        app.provide(ROUTER_KEY, this); // provide/inject 是 Vue3 提供的一种新的组件通信方式，可以实现祖先组件向所有子孙组件传递数据，两个参数分别是 key 和 value
    };
};