<template>
    <v-header />
    <sidebar />
    <main class="content-box" :class="{'content-collapse': sidebarStore.opened}">
        <router-view></router-view>
    </main>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import vHeader from '../components/Header.vue';
import { useSidebarStore } from '../store/sidebar';

const sidebarStore = useSidebarStore();
</script>

<style lang="css" scoped>
.content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left 0.3s ease-in-out;
    transition: left 0.3s ease-in-out;
    background: #eef0fc;
    overflow: hidden;
}

.content {
    width: auto;
    height: 100%;
    padding: 20px;
    overflow-y: scroll;
    box-sizing: border-box;
}

.content::-webkit-scrollbar {
    width: 0;
}

.content-collapse {
    left: 65px;
}
</style>