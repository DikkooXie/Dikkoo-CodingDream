<template>
  <div>
    <Rate :value="rate" theme="yellow" @update-rate="updateRate"/>
  </div>
</template>

<script setup>
// import Rate from './components/Rate0.vue';
// import Rate from './components/Rate1.vue';
import Rate from './components/Rate2.vue';
import { ref } from 'vue';

let rate = ref(3);

function updateRate(num) {
  rate.value = num;
}
</script>

<style lang="css" scoped>

</style>