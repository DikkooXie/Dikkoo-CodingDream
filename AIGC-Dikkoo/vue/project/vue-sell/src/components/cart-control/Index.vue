<template>
    <div class="cart-control">
        <Transition name="move">
            <div class="cart-decrease" @click="decreaseCart" v-show="food.count">
                <i class="iconfont icon-jianhao"></i>
            </div>
        </Transition>
        <div class="cart-count" v-show="food.count">
            {{ food.count }}
        </div>
        <div class="cart-add" @click="addCart">
            <i class="iconfont icon-jiaohao-copy"></i>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    food: {
        type: Object,
        default: () => {}
    }
});

const emits = defineEmits(['update:food']);

// 将菜品添加至购物车
const addCart = () => {
    const obj = props.food;
    if(!obj.count) {
        obj.count = 1;
    } else {
        obj.count++;
    }
    emits('update:food', obj);
};

// 将菜品从购物车中移除/减少
const decreaseCart = () => {
    const obj = props.food;
    if(obj.count) {
        obj.count--;
        emits('update:food', obj);
    }
};
</script>

<style lang="less" scoped>
.cart-control {
    display: flex;
    align-items: center;

    .cart-decrease {
        padding: 0 0.5rem;
        opacity: 1;
        transform: translateX(0);

        &.move-enter-active,
        &.move-leave-active {
        transition: all 0.4s linear;
        }

        &.move-enter-from,
        &.move-leave-to {
        opacity: 0;
        transform: translateX(24px) rotate(180deg);
        }

        .icon-jianhao {
        font-size: 18px;
        color: rgb(0, 160, 220);
        }
    }

    .cart-count {
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    .cart-add {
        padding: 0 0.5rem;

        .icon-jiaohao-copy {
        font-size: 20px;
        color: rgb(0, 160, 220);
        }
    }
}
</style>