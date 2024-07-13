<template>
    <div class="goods">
        <div class="goods-content">
            <div class="menu-warp" ref="menuWarp">
                <ul>
                    <li 
                        class="menu-item"
                        :class="{current: selectIndex === index}"
                        v-for="(item, index) in state.goods"
                        :key="index"
                    >
                        <span class="text" @click="selectMenu(index)">
                            <SupportIcon v-if="item.type>=0" :type="item.type" size="3"/>
                            {{ item.name }}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-warp" ref="foodsWarp">
                <ul>
                     <li class="food-list" v-for="(item, index) in state.goods" :key="index" ref="foodList">
                        <!-- 菜系 -->
                        <h1 class="title">{{ item.name }}</h1>
                        <!-- 菜品 -->
                        <li class="food-item" v-for="(food, i) in item.foods" :key="i">
                            <div class="pic">
                                <img :src="food.icon" :alt="food.name">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <div class="desc">{{food.description}}</div>
                                <div class="extra">
                                    <span class="count">月售 {{food.sellCount}}份</span>
                                    <span>好评率 {{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{ food.price }}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                                </div>
                                <div class="cartcontrol-warp">
                                    <CartControl :food="food" @update:food="updateFood" />
                                </div>
                            </div>
                        </li>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <ShopCart :cartFoods="state.cartFoods" :seller="props.seller"/>
</template>

<script setup>
import { ref, reactive, nextTick, computed, defineProps } from 'vue';
import { getGoods } from '@/api';
import BScroll from '@better-scroll/core'
import SupportIcon from '@/components/support-icon/Index.vue'
import CartControl from '@/components/cart-control/Index.vue'
import ShopCart from '@/components/shop-cart/Index.vue'

const menuWarp = ref(null);
const foodsWarp = ref(null);
const foodList = ref(null);

const props = defineProps({
    seller: {
        type: Object,
        default: () => {}
    }
});

// 滚动效果
const initScroll = () => {
    new BScroll(menuWarp.value, {
        // ...... 详见配置项
        click: true
    })

    state.foodsScroll = new BScroll(foodsWarp.value, {
        click: true,
        probeType: 3
    })

    // 监听滚动
    state.foodsScroll.on('scroll', (pos) => {
        state.scrollY = Math.abs(pos.y);
    });
};

const state = reactive({
    goods: [],
    foodsScroll: null,
    listHeight: [],
    scrollY: 0,
    cartFoods: [] // 购物车中的菜品
});

const selectIndex = computed(() => {
    for(let i = 0; i < state.listHeight.length; i++) {
        let height1 = state.listHeight[i]; // 当前菜系的高度
        let height2 = state.listHeight[i + 1]; // 下一个菜系的高度
        if (!height2 || (state.scrollY >= height1 && state.scrollY < height2)) { // 滚动到当前菜系
            return i; // 返回当前菜系的索引
        }
    }
    return 0; // 默认返回第一个菜系
});

const selectMenu = (index) => {
    state.foodsScroll.scrollToElement(foodList.value[index], 300); // 滚动到指定元素
};

getGoods().then(res => {
    console.log(res);
    state.goods = res;
    nextTick(() => { // 等待dom更新后再初始化滚动
        initScroll(menuWarp.value);
        initScroll(foodsWarp.value);
        _calculateHeight();
    });
});

// 监听滚动
const _calculateHeight = () => {
    let sumHeight = 0;
    state.listHeight.push(sumHeight);
    foodList.value.forEach((item) => {
        sumHeight += item.clientHeight;
        state.listHeight.push(sumHeight);
    });
    console.log(state.listHeight);
};

// 更新购物车
const updateFood = () => {
    console.log('updateFood');
    // 将拥有count属性的菜品过滤出来
    const res = [];
    for(let good of state.goods) {
        for(let food of good.foods) {
            if(food.count) {
                res.push(food);
            }
        }
    }
    state.cartFoods = res;
};
</script>

<style lang="less" scoped>
@import '@/assets/variable.less';

.goods {
    width: 100%;
    position: absolute;
    bottom: 4rem;
    top: 12rem;
    overflow: hidden;
}

.goods-content {
    display: flex;
    height: 100%;
    .menu-warp {
        flex: 0 0 6rem; // 不伸缩，不收缩，初始宽度6rem
        background-color: @color-background-ssss;
        
    }
}

.menu-item {
    padding: 1rem 0;
    text-align: center;
    font-size: 0.75rem;
    color: @color-font;
    &.current {
        background-color: #fff;
        font-weight: bold;
    }
}

.foods-warp {
    flex: 1;

    .title {
        height: 26px;
        line-height: 26px;
        font-size: @fontsize-small;
        color: rgb(147, 153, 159);
        background-color: @color-background-ssss;
        padding-left: 14px;
        border-left: 2px solid #d9dde1;
    }

    .food-item {
        display: flex;
        padding: 18px;

        .pic {
            flex: 0 0 57px;
            margin-right: 10px;

            img {
            width: 100%;
            }
        }

        .content {
            flex: 1;
            position: relative;

            .name {
            font-size: @fontsize-medium;
            color: @color-background;
            margin: 2px 0 8px 0;
            }

            .desc,
            .extra {
            font-size: @fontsize-small-s;
            color: rgb(147, 153, 159);
            margin-bottom: 8px;

            .count {
                margin-right: 12px;
            }
            }

            .price {
            font-weight: 700;

            .now {
                font-size: @fontsize-medium;
                color: @color-red;
                margin-right: 8px;
            }

            .old {
                font-size: @fontsize-small-s;
                color: rgb(147, 153, 159);
                text-decoration: line-through;
            }
            }

            .cartcontrol-warp {
                position: absolute;
                right: 0;
                bottom: 0;
            }
        }
    }
}
</style>