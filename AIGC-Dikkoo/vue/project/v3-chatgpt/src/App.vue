<template>
  <!-- <header class="flex justify-between items-center p-4 bg-gray-400">
    <router-link to="/">
      <img src="./assets/vue.svg" alt="">
    </router-link>
    <div class="flex gap-8">
      <router-link to="/about" class="header-link__item">About</router-link>
      <router-link to="/join" class="header-link__item">Join US</router-link>
      <router-link to="/login" class="header-link__item">Login</router-link>
    </div>
  </header> -->
  <router-view />
</template>

<script setup>

</script>

<style lang="css" scoped>
.app__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
  color: #333;
}

.header-link {
  display: flex;
  gap: 3rem;
}

.header-link__item {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}
</style>