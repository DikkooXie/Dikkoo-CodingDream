## vuex 带来了数据流管理

- npm i vuex 安装

- 小型项目不需要vuex/pinia，但对于大型项目，需要一个专门管理数据的“秘书”。
    - 专业打理数据流
    - 把数据收归于中央管理

- 读取状态
    - useStore
    - computed store.state.count

- 写状态
    - store.dispatch('increment') #action => store.commit('increment') #mutation