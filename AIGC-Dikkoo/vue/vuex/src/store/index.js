import { createStore } from 'vuex';

// 全局状态
// 不再需要纠结父子组件之间的传值问题
const state = { // 状态对象
    count: 0,
    user: null
}

// 通过actions提交mutation，而不是直接修改state
const actions = {
    increment: ({ commit }) => commit('increment') // commit 提交一个修改
}

// 所有的状态修改都要经过mutations
const mutations = {
    increment(state) {
        state.count++
    }
}

// 除了读操作，对写操作非常严格，只能通过mutation来修改state
const store = createStore({
    state,
    actions,
    mutations
})

export default store;