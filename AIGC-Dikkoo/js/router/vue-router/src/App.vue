<template>
  <header class="home-page__hd">
    <nav class="nav-content">
      <router-link to="/">Back to Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </header>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
  .home-page__hd {
    background-color: #f0f0f0;
    padding: 10px;
  }
  .nav-content {
    display: flex;
    justify-content: space-between;
  }
  .nav-content a {
    color: #333;
    text-decoration: none;
  }
  .nav-content a:hover {
    color: #000;
  }
</style>