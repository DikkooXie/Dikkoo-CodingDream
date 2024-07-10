<!-- 新的需求：不同风格的星星 -->
<template>
    <div :style="fontStyle">
        <div class="rate" @mouseout="mouseOut">
            <span @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>
            <span class="hollow" :style="fontwidth">
                <span @click="onRate(num)" @mouseover="mouseOver(num)" v-for="num in 5">★</span>
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';

let props = defineProps({ // 定义props，接收外部传入的值
    value: Number,
    theme: {
        type: String,
        default: 'yellow'
    }
})

// 自身的状态
let width = ref(props.value);
let fontwidth = computed(() => `width: ${width.value}em;`); // em是相对于父元素的font-size的单位

// 计算属性，根据传入的值计算出评分
let rate = computed(() => "★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value)) 

let themeObj = {
    orange: '#fa541c',
    blue: '#40a9ff',
    red: '#f5222d',
    green: '#73d13d',
    yellow: '#fadb14',
    black: '#000000'
}

let fontStyle = computed(() => ({
    color: themeObj[props.theme]
}))

let emits = defineEmits(['update-rate']);

const onRate = (num) => {
    emits('update-rate', num);
}

function mouseOver(i) {
    width.value = i;
}

function mouseOut() {
    width.value = props.value;
}
</script>

<style lang="css" scoped>
.rate {
    position: relative;
    display: block;
}

.rate span {
    letter-spacing: 3px;
}

.rate > span.hollow {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
}
</style>