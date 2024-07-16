<template>
  <!-- <header class="app__header">
    <h1 class="app__title">你的天气</h1>
    <nav class="app__nav">
      <router-link to="/" class="app-nav__link">Home</router-link>
      <router-link to="/about" class="app-nav__link">About</router-link>
    </nav>
  </header> -->
  <main class="app__main">
    <router-view></router-view>
  </main>
</template>

<script setup>

</script>

<style lang="css" scoped>
.app__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.app__title {
  margin: 0;
  font-size: 1.5rem;
  font-family: 'Heiti SC', sans-serif;
  font-weight: bold;
}

.app__nav {
  display: flex;
}

</style>