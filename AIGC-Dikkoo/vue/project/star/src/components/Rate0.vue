<!-- 评分组件 -->
<template>
    <div>
        {{ rate }}
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

let props = defineProps({ // 定义props，接收外部传入的值
    value: Number
})

let rate = computed(() => "★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value)) // 计算属性，根据传入的值计算出评分
</script>

<style lang="css" scoped>

</style>