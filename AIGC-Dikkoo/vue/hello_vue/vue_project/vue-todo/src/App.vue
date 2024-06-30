<template>
  <nav>
    <span @click="changeTab(1)">基础知识</span> |
    <span @click="changeTab(2)">购物车</span> |
    <span @click="changeTab(3)">待办事项</span>
  </nav>

  <Base v-if="state.index === 1" />
  <Shopping v-if="state.index === 2" />
  <Todo v-if="state.index === 3" />
</template>

<script setup>
import { ref, reactive } from 'vue'
import Base from './components/Base.vue'
import Shopping from './components/Shopping.vue'
import Todo from './components/Todo.vue'

let state = reactive({
  index: 1
})

const changeTab = (tab) => {
  console.log(tab);
  state.index = tab;
}
</script>

<style lang="css" scoped>
  * {
    text-align: center;
  }
</style>