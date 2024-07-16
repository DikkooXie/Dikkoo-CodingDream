/**
 * export：將函數或变量暴露給外部使用
 * 暴露：一个模块可以有多个暴露，引入时需要使用大括号
 */
export const add = (a, b) => {
    return a + b;
}

export const minus = (a, b) => {
    return a - b;
}

/**
 * export default：將函數或变量作为默认暴露给外部使用
 * 默认暴露：一个模块只能有一个默认暴露，引入时不需要使用大括号
 */
export default {
    a: 1,
    b: 2
}