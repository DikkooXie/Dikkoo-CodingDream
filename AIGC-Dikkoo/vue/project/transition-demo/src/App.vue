<template>
  <div class="page">
    <div class="card">
      <div class="card__header">
        <h3 class="card-title">{{ name }}</h3>
        <div class="card-subtitle">Transition & Animation</div>
      </div>
      <div class="card__content">
        <!-- 动态类名，可以是"emoji"，也可以是"emoji hidden" -->
        <!-- <div :class="['emoji', {pulse: !isActive}]">😄</div>  -->
        <!-- transition 需配合 v-if 或 v-show 使用 --> 
        <!-- <transition name="paulse">
          <div v-if="isActive" class="emoji">😄</div>
         </transition> -->
         <transition 
          class="animate__tada"
          enter-active-class="animate__animated animate__tada"
          leave-active-class="animate__animated animate__bounce"
         >
          <div v-if="isActive" class="emoji">😄</div>
         </transition>
      </div>
      <div class="card__action">
        <button @click="isActive = !isActive" class="card-btn" type="button">请按这里</button>
        <!-- <router-link to="/transition" class="btn btn-primary">Transition</router-link>
        <router-link to="/animation" class="btn btn-primary">Animation</router-link> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = 'Dikkoo';
const isActive = ref(true);
</script>

<style lang="css" scoped>
/* CSS 的模块化思想, 将样式拆解成多个文件 */
@import './styles/app.css';   /* 全局样式 */
@import './styles/card.css';  /* 卡片样式 */
@import './styles/animation.css'; /* 过渡动画 */
</style>