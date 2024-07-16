<template>
    <div class="nav-list">
        {{ count }}
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const count = computed(() => store.state.count);
</script>

<style lang="css" scoped>

</style>