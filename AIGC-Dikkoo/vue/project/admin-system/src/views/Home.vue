<template>
    <v-header />
    <sidebar />
    <div>
        Home page
        <router-view></router-view>
    </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import vHeader from '../components/Header.vue';
</script>

<style lang="css" scoped>

</style>