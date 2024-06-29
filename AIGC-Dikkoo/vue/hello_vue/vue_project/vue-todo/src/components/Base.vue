<template>
    <div>
        <h2>{{temp}} ℃</h2>
        <button @click="plus">+1</button>
        <button @click="minus">-1</button>
        <h3>建议：{{suggest}}</h3>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

let temp = ref(20);
// let suggest = ref('夹克')

const plus = () => {
    temp.value += 1;
    // changeSuggest();
}

const minus = () => {
    temp.value -= 1;
    // changeSuggest();
}

/**
 * 每次温度变化时，根据温度值改变建议
 */
// const changeSuggest = () => {
//     if (temp.value > 22) {
//         suggest.value = '短袖'
//     } else if (temp.value < 13) {
//         suggest.value = '羽绒服'
//     } else {
//         suggest.value = '夹克'
//     }
// }

/**
 * watch监听temp的变化，当temp变化时，执行回调函数
 */
// watch(temp, (newVal) => {
//     if (newVal >= 22) {
//         suggest = '短袖'
//     } else if (newVal >= 12) {
//         suggest = '夹克'
//     } else {
//         suggest = '羽绒服'
//     }
// })

/**
 * computed计算属性，根据温度值返回建议
 */
const suggest = computed(() => {
    if (temp.value > 22) {
        return '短袖'
    } else if (temp.value < 13) {
        return '羽绒服'
    } else {
        return '夹克'
    }
})

// 性能分析：
// computed会有缓存，只有temp变化时，才会重新计算suggest的值，而watch每次都会执行回调函数。
// 所以当数据变化时，建议使用computed，当数据变化时，不需要重新计算时，使用watch。
</script>

<style lang="css" scoped>
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>