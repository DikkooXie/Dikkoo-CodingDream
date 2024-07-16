<template>
  <div :style="fontstyle"> <!--传入字体颜色-->
    <div class="rate" @mouseout="mouseOut"> <!--鼠标移出时触发mouseOut方法恢复原来的评分-->
      <!--鼠标移入时更新评分宽度,将实体星星显示出来-->
      <span class="star" @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>

      <!--实体星星,使用fontwidth控制显示宽度,覆盖空心星星-->
      <span class="hollow" :style="fontwidth">
        <!--点击实体星星更新评分，移开恢复原始评分宽度-->
        <span class="star" @click="onRate(num)" @mouseover="mouseOver(num)" v-for="num in 5" :key="num" >★</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";

// 传入参数
let props = defineProps({
  value: Number,
  theme: { type: String, default: "orange" },
});

// 主题颜色表
const themeObj = {
  black: "#000",
  white: "#fff",
  red: "#f5222d",
  orange: "#fa541c",
  yellow: "#fadb14",
  green: "#73d13d",
  blue: "#40a9ff",
};

// 字体颜色
const fontstyle = computed(() => {
  return `color:${themeObj[props.theme]};`;
});

// 评分宽度
let width = ref(props.value);

// 鼠标移入时，更新评分宽度
function mouseOver(i) {
  width.value = i; 
}

// 鼠标移出时，恢复原来的评分宽度
function mouseOut() {
  width.value = props.value;
}

// 评分宽度，每颗星星宽度为1em，评分为几颗星星就是几em
const fontwidth = computed(() => `width:${width.value}em;`); 

// 定义emits，用于更新父组件的评分
let emits = defineEmits(["update-rate"]);

// 点击更新评分
function onRate(num) {
  emits("update-rate", num); // 相当于触发父组件的update-rate事件
}
</script>

<style scoped>
/* 评分样式 */
.rate {
  position: relative; /* 设置相对定位，便于子元素星星绝对定位 */
  display: inline-block;
}

.rate .star{
    display: inline-block;
    width: 1em;
}

/* 实体星星 */
.rate > span.hollow {
  position: absolute; /* 设置绝对定位，便于星星覆盖 */
  display: inline-block; /* 设置为行内块元素，便于星星横向排列 */
  top: 0; /* 设置顶部对齐 */
  left: 0; /* 设置左侧对齐 */
  width: 0; /* 初始宽度为0 */
  height: 1em; /* 高度为1em */
  overflow: hidden; /* 关键: 隐藏超出部分,超出评分宽度的实体星星不会被显示出来,空心星星补上 */
}
</style>