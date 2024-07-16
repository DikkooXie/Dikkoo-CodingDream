<template>
  <div>
    <AppHeader />
    <div>
      <button @click="increment()">+</button>
      <span>{{ count }}</span>
      <button @click="store.commit('decrement')">-</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import AppHeader from './components/AppHeader.vue';

const store = useStore(); // hooks 编程
console.log(store.state.count);

const count = computed(() => store.state.count);
console.log(count.value);

const increment = () => {
  // store.commit('increment'); // 通过commit直接触发mutation
  store.dispatch('increment'); // 通过dispatch触发action，action再触发mutation
};
</script>

<style lang="css" scoped>

</style>