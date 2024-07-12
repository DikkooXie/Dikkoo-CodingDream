<template>
  <Header :seller="sellerData" />
  <div class="tab">
    <div class="tab-warp">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-warp">
      <router-link to="/comment">评论</router-link>
    </div>
    <div class="tab-warp">
      <router-link to="seller">商家</router-link>
    </div>
  </div>
  
  <router-view></router-view>
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

<style lang="less" scoped>
@import '@/assets/variable.less';

.tab{
  display: flex;
  &-warp{
    flex: 1;
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    font-size: 1rem;
    border-bottom: 1px solid #ccc;
    a {
      width: 100%;
      height: 100%;
      display: block;
      color: @color-font;
      text-decoration: none;
    }
    .router-link-active{
      color: @color-orange;
      font-weight: bold;
      border-bottom: 0.5rem solid @color-orange;
    }
  }
}
</style>