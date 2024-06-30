<template>
    <div>
        <h2 @click="happy">Are you happy? {{count}}</h2>
        <div>
            <h3 v-if="count < 5">Sad</h3>
            <h3 v-if="count > 5">Happy</h3>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
let count = ref(1);

const happy = () => {
    count.value++;
}
</script>

<style lang="css" scoped>
    
</style>