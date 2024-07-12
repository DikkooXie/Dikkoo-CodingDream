<template>
  <Header :seller="sellerData" />
  
</template>

<script setup>
import { ref } from 'vue';
import Header from './components/header/Index.vue';
import { getSeller } from '@/api';
let sellerData = ref({});

getSeller().then(res => {
  console.log(res);
  sellerData.value = res;
})

</script>

<style lang="scss" scoped>

</style>