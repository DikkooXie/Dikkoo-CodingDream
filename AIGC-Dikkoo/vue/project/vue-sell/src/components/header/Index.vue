<template>
  <div class="header" @click="isDetailShow=true">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
        </div>
        <div class="support" v-if="seller.supports"> <!--先判断seller.supports是否存在，以免后续访问报错-->
          <SupportIcon :type="seller.supports[0].type" size="1" />
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="iconfont icon-youjiantou1"></i>
      </div>

    </div>
    <div class="bulletion-wrapper">
      <span class="bulletion-title"></span>
      <span class="bulletion-text">{{ seller.bulletin }}</span>
      <i class="iconfont icon-youjiantou1"></i>
    </div>

    <div class="bg"></div>

    <!-- detail -->
    <HeaderDetail v-show="isDetailShow" @close-detail="isDetailShow=false"/>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
import SupportIcon from '@/components/support-icon/Index.vue'
import HeaderDetail from '@/components/header-detail/Index.vue'

const props = defineProps({
  seller: {
    type: Object
  }
})

const isDetailShow = ref(false);

const bg = computed(() => `url(${props.seller.avatar})`);
</script>

<style lang="less" scoped>
@import '@/assets/variable.less';
@import '@/assets/mixin.less';

.header{
  color: @color-white;
  position: relative;
  background-color: @color-background-ss;

  .content-wrapper{
    display: flex;
    padding: 24px 12px 18px 24px;
    position: relative;

    .avatar{
      width: 64px;
      height: 64px;
      border-radius: 2px;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
    .content{
      flex: 1;
      margin-left: 16px;
      .title{
        margin-bottom: 8px;
        display: flex;
        .brand{
          width: 30px;
          height: 18px;
          display: inline-block;
          // background-image: url(./brand@2x.png);
          .bg-image('brand');
          background-size: 100% 100%;
        }
        .name{
          font-size: @fontsize-large;
          margin-left: 6px;
          font-weight: bold;
        }
      }
      .description{
        font-size: @fontsize-small;
        margin-bottom: 8px;
      }
      .support{
        display: flex;
        align-items: center;
        .text{
          font-size: @fontsize-small-s;
          margin-left: 4px;
        }
      }
    }
    .support-count{
      position: absolute;
      right: 12px;
      bottom: 14px;
      height: 24px;
      line-height: 24px;
      background-color: @color-background-sss;
      border-radius: 14px;
      padding: 0 8px;
      display: flex;
      align-items: center;
      .count{
        font-size: @fontsize-small-s;
      }
      .iconfont{
        font-size: @fontsize-small-s;
        margin-left: 2px;
      }
    }
  }
  .bulletion-wrapper{
    display: flex;
    align-items: center;
    height: 28px;
    padding: 0 8px;
    background-color: @color-background-sss;
    .bulletion-title{
      flex: 0 0 22px;
      height: 12px;
      .bg-image('bulletin');
      background-size: 100% 100%;
    }
    .bulletion-text{
      flex: 1;
      margin-left: 4px;
      font-size: @fontsize-small-s;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .icon-youjiantou1{
      flex: 0 0 10px;
      font-size: 8px;
    }
  }
  .bg{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: v-bind(bg);
    background-size: 100% 100%;
    z-index: -1;
    filter: blur(10px);
  }
}
</style>