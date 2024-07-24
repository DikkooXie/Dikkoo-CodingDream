import { defineStore } from "pinia";
import { reactive } from "vue";
import axios from 'axios';

export const useQuestionStore = defineStore('question', () => {
    const state = reactive({
        questionList: [],
        itemNum: 0, // 当前题目
        answerList: [], // 答案列表
    });

    function startQuestion() {
        axios.get('https://mock.mengxuegu.com/mock/65a7d72cb674c730aaefdcea/example/question')
        .then(res => {
            console.log(res);
            state.questionList = res.data.questions;
            state.itemNum = 1;
        })
    }

    function nextQuestion() {
        if (state.itemNum < state.questionList.length) {
            state.itemNum++;
        }
    };

    function submitOption(index) {
        state.answerList.push(index);
    }

    return {
        state,
        startQuestion,
        nextQuestion,
        submitOption
    };
});