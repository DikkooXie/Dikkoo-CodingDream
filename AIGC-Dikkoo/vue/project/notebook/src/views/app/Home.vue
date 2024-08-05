<template>
    <header class="header">
        <div class="hd__search">
            <van-search placeholder="搜索" class="search-input" />
            <van-icon name="scan" class="search-scan" />
        </div>
    </header>
    <van-tabs v-model:active="active" swipeable @change="onTabChange" sticky>
        <van-tab v-for="(item, index) in tabs" :key="index" :title="item.meta.title">
            <router-view v-slot="{Component}">
                <keep-alive :include="tabs.filter(tab => tab.meta.cache).map(tab => tab.name)">
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </van-tab>
    </van-tabs>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 筛选出homeRoutes中的路由
const tabs = router.getRoutes().filter(route => route.path === '/home')[0].children
// 找到当前路由的index
const active = ref(tabs.findIndex(tab => tab.path === router.currentRoute.value.path))

const onTabChange = () => {
    // 切换路由
    router.push(tabs[active.value].path)
}
</script>

<style lang="scss" scoped>
.header {
    background: #fff;
    .hd__search {
        display: flex;
        align-items: center;
        padding: 0.2rem;
        .search-input {
            flex: 1;
        }
        .search-scan {
            font-size: 0.6rem;
            margin: 0 0.3rem;
        }
    }
}
</style>