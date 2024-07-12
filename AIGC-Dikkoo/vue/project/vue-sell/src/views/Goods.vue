<template>
    <div class="goods">
        <div class="goods-content">
            <div class="menu-warp" ref="menuWarp">
                <ul>
                    <li 
                        class="menu-item"
                        :class="{current: state.selectIndex === index}"
                        v-for="(item, index) in state.goods"
                        :key="index"
                    >
                        <span class="text" @click="state.selectIndex=index">
                            <SupportIcon v-if="item.type>=0" :type="item.type" size="3"/>
                            {{ item.name }}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-warp">

            </div>
        </div>
    </div>
</template>

<script setup>
import SupportIcon from '@/components/support-icon/Index.vue'
import { getGoods } from '@/api';
import { ref, reactive, nextTick } from 'vue';
import BScroll from '@better-scroll/core'

const menuWarp = ref(null);

// 滚动效果
const initScroll = (dom) => {
    let bs = new BScroll(dom, {
        // ...... 详见配置项
        click: true
    })
};

const state = reactive({
    goods: [],
    selectIndex: 0
});

getGoods().then(res => {
    console.log(res);
    state.goods = res;
    nextTick(() => { // 等待dom更新后再初始化滚动
        initScroll(menuWarp.value);
    });
});
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
</style>