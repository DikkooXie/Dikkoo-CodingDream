<template>
    <div class="shop-cart">
        <div class="content">
            <div class="content-left">
                <div class="logo-warp">
                    <div class="logo" :class="{ active: props.cartFoods.length > 0 }">
                        <i class="iconfont icon-cart" :class="{ active: props.cartFoods.length > 0 }"></i>
                    </div>
                    <div class="num">{{ props.cartFoods.length }}</div>
                </div>
                <div class="price">￥ {{ totalPrice }}</div>
                <div class="desc">另需配送费 {{seller.deliveryPrice}} 元</div>
            </div>
            <div class="content-right">
                <div class="pay">
                    {{ payMessage }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    cartFoods: {
        type: Array,
        default: () => []
    },
    seller: {
        type: Object,
        default: () => {}
    }
});

// 计算购物车中商品的总价
const totalPrice = computed(() => {
    return props.cartFoods.reduce((total, food) => {
        return total + food.price * food.count;
    }, 0);
});

// 支付提示消息
const payMessage = computed(() => {
    if (props.seller.minPrice - totalPrice.value > 0) {
        return `还差 ${props.seller.minPrice - totalPrice.value} 元起送`;
    } else {
        return '去结算';
    }
});
</script>

<style lang="less" scoped>
@import '@/assets/variable.less';

.shop-cart {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  height: 46px;

  .content {
    display: flex;
    background-color: @color-background;
    color: @color-light-grey;

    &-left {
      flex: 1;
      display: flex;

      .logo-warp {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #141d27;
        padding: 6px;
        box-sizing: border-box;
        margin: 0 12px;
        position: relative;
        top: -10px;

        .logo {
          width: 100%;
          height: 100%;
          background-color: @color-dark-grey;
          border-radius: 50%;
          text-align: center;

          &.active {
            background-color: @color-blue;
          }

          .iconfont {
            font-size: @fontsize-large-xxx;
            line-height: 44px;

            &.active {
              color: @color-white;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          color: @color-white;
          background-color: @color-red;
          border-radius: 16px;
          font-size: @fontsize-small-s;
        }
      }

      .price {
        line-height: 46px;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: @fontsize-large;
        font-weight: bold;

        &.active {
          color: @color-white;
        }
      }

      .desc {
        line-height: 46px;
        font-size: @fontsize-small-s;
        margin-left: 20px;
      }
    }

    &-right {
      flex: 0 0 8rem;

      .pay {
        width: 100%;
        height: 100%;
        line-height: 46px;
        text-align: center;

        &.enough {
          background-color: green;
        }
      }
    }
  }
}
</style>