<template>
    <div>
        <router-view v-slot="{Component}">
            <!-- 这里的 v-slot 用于接收 router-view 传递的 Component 组件 -->
            <keep-alive :include="cachedComponents">
                <component :is="Component" />
            </keep-alive>
        </router-view>
        <div class="footer h-12">
            <tab-bar class="fixed bottom-0" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '@/views/layout/TabBar.vue'

const router = useRouter();
const cachedComponents = computed(() => {
    return router.getRoutes()
        .filter(route => route.meta.cache)
        .map(route => route.name); 
        // cache 为 true 的路由（需要缓存的路由）
});
</script>

<style lang="scss" scoped>

</style>