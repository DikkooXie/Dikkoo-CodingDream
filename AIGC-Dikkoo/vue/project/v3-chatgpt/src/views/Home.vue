<template>
    <div class="flex flex-col h-screen">
        <header class="flex flex-nowrap fixed w-full items-baseline top-0 px-6 py-4 bg-gray-100">
            <div class="text-2xl font-bold">
                ChatGPT
            </div>
            <div class="ml-4 text-sm text-gray-500">
                基于OpenAI的ChatGPT自然语言模型人工智能对话
            </div>
            <div 
                class="ml-auto px-3 py-2 text-sm cursor-pointer hover:bg-white rounded-md"
                @click="setConfig()"
            >
                设置
            </div>
        </header>

        <!-- 消息列表部分 -->
        <div class="flex-1 mx-2 mt-20 mb-2">
            <div 
                class="group flex flex-col px-4 py-3 rounded-lg"
                v-for="(item, index) in messageList.filter(item => item.role != 'system')"
                :key="index"
            >
                <!-- 角色 -->
                <div 
                    :class="{
                        'text-right': item.role == 'user',
                        'text-left': item.role == 'assistant'
                    }"
                    class="text-sm text-gray-500 mb-1"
                >
                    {{ item.role == 'user' ? '我' : 'ChatGPT' }}
                </div>
                <!-- 内容 -->
                <div 
                    :class="{
                        'bg-blue-500 text-white': item.role == 'user',
                        'bg-gray-200': item.role == 'assistant'
                    }"
                    class="px-4 py-2 rounded-lg"
                >
                    {{ item.content }}
                </div>
            </div>
        </div>

        <!-- 输入框部分 -->
        <div class="sticky bottom-0 w-full p-6 pb-8 bg-gray-100">
            <div class="mb-2 text-sm text-gray-500" v-show="inputConfig">
                请输入API Key:
            </div>
            <div class="flex">
                <input 
                    v-model="inputContent"
                    :type="inputConfig ? 'password' : 'text'"
                    :placeholder="inputConfig ? 'sh-xxxxxx' : '想聊些什么？'"
                    @keydown.enter="sendOrsaveConfig()"
                    class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md"
                />
                <button 
                    class="px-4 py-2 ml-2 text-sm text-white bg-blue-500 rounded-md disabled:opacity-50"
                    @click="sendOrsaveConfig()"
                    :disabled="!inputContent.length || isThinking"
                >
                    {{ inputConfig ? '保存' : '发送' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { chat } from '../libs/gpt.js';

onMounted(() => {
    // 初始化
    if(!localStorage.getItem('apiKey')) {
        inputConfig.value = true;
    }
});

const inputConfig = ref(false); // false为发送消息，true为设置API Key

const inputContent = ref(''); // 输入框内容

const isThinking = ref(false); // 是否正在思考

const messageList = ref([
    {
        role: 'system',
        content: '你是一个人工智能客服，请尽可能简洁地回答问题'
    },
    {
        role: 'assistant',
        content: `你好，我是AI语言模型，我可以提供一些常用服务和信息，例如：
            1. 翻译：我可以把中文翻译成英文，英文翻译成中文，还有其他一些语言翻译，比如法语、日语、西班牙语等。
            2. 咨询服务：如果你有任何问题需要咨询，例如健康、法律、投资等方面，我可以尽可能为你提供帮助。
            3. 闲聊：如果你感到寂寞或无聊，我们可以聊一些有趣的话题，以减轻你的压力。
            请告诉我你需要哪方面的帮助，我会根据你的需求给你提供相应的信息和建议。
        `
    }
]); // 消息列表

const setConfig = () => {
    inputContent.value = '';
    inputConfig.value = !inputConfig.value;
}

const sendOrsaveConfig = () => {
    if(!inputContent.value.length) {
        alert('内容不能为空！');
        return;
    }

    if(isThinking.value) {
        alert('AI正在思考中，请稍后再试！');
        return;
    }

    if(inputConfig.value) {     // 设置API Key状态
        // 保存API Key
        if(saveConfig(inputContent.value)) {
            inputConfig.value = false;
        }
    } else {                    // 发送消息状态
        // 发送消息
        sendMessage(inputContent.value);
    }

    inputContent.value = ''; // 清空输入框
}

const saveConfig = (key) => {
    localStorage.setItem('apiKey', key.trim());
    return true;
}

const getApiKey = () => {
    return localStorage.getItem('apiKey');
}

const sendMessage = async () => {
    // 发送消息
    const message = inputContent.value.trim();
    try {
        isThinking.value = true; // 开始思考，思考中禁止发送消息

        messageList.value.push({ // 添加用户消息
            role: 'user',
            content: message
        });

        const data = await chat(messageList.value, getApiKey()); // 调用AI接口，获取AI回复

        messageList.value.push({ // 添加AI回复
            role: 'assistant',
            content: data
        });
    } catch (error) {
        console.error(error);
    } finally {
        isThinking.value = false;
    }
}
</script>

<style lang="css" scoped>

</style>