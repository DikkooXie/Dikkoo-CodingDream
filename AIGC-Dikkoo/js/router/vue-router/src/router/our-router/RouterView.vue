<template>
    <!-- 动态组件，展示内容依赖于url的变化 -->
    <component :is="component"></component> 
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from './index.js'

const router = useRouter();

// 为什么使用计算属性？
// 因为我们需要根据当前的路由地址，找到对应的组件
const component = computed(() => {
    // return Math.random() > 0.5 ? Home : About; // 乐，还能这么玩
    const route = router.routes.find((route) => route.path == router.current.value)
    return route ? route.component : null;
})
</script>

<style lang="css" scoped>

</style>