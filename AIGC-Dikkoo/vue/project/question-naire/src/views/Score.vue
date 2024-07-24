<template>
    <div class="score">
        <header class="your_score">
            <span class="score_num">{{ score }} 分</span>
            <div class="result_tip">{{ scoreTip }}</div>
        </header>
    </div>
</template>

<script setup>
import { useQuestionStore } from '../store/question.js'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const questionStore = useQuestionStore();
const { state } = storeToRefs(questionStore);

const scoreTipsArr = [
    "你说，是不是把知识都还给小学老师了？",
    "还不错，但还需要继续加油哦！",
    "不要嘚瑟还有进步的空间！",
    "智商离爆表只差一步了！",
    "你也太聪明啦！学霸诞生！",
];

const score = computed(() => {
    let sum = 100
    const ans =100/(state.value.answerList.length) 
    if(state.value.answerList.length===0)return 0
    for(let i=0;i<state.value.answerList.length;i++){
        if(!state.value.questionList[i].topic_answer[state.value.answerList[i]].is_standard_answer){
            sum -= ans
        }

    }
    return sum
})

const scoreTip = computed(() => {
    if (score.value === 100) {
        return scoreTipsArr[4];
    } else if (score.value >= 80) {
        return scoreTipsArr[3];
    } else if (score.value >= 60) {
        return scoreTipsArr[2];
    } else if (score.value >= 40) {
        return scoreTipsArr[1];
    } else {
        return scoreTipsArr[0];
    }
});
</script>

<style lang="less" scoped>
.score {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: url(../assets/images/4-1.jpg) no-repeat;
    .your_score {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 100px;
        .score_num {
            font-size: 40px;
            font-weight: bold;
            color: #333;
        }
        .result_tip {
            font-size: 16px;
            color: #666;
            margin-top: 20px;
        }
    }
}
</style>