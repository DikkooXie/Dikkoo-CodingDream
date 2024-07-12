<template>
    <div class="header-detail">
        HeaderDetail
        <div class="detail-close" @click.stop="colse">
            <i class="iconfont icon-close-bold"></i>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['close-detail']);

const colse = () => {
    emits('close-detail');
}

</script>

<style lang="less" scoped>
@import '@/assets/variable.less';

.header-detail {
    /* 铺满全屏 */
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: @color-background-s;
    color: @color-white;
    z-index: 100;
    backdrop-filter: blur(10px);
}

.detail-close {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    .iconfont {
        font-size: @fontsize-large-xxxx;
    }
}
</style>