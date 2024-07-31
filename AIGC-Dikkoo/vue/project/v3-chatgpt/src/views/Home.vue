<template>
    <div class="flex flex-col h-screen">
        <header class="flex flex-nowrap items-center fixed w-full top-0 px-6 py-4 bg-openai-bg">
            <div 
                class="cursor-pointer"
            >
                <img src="../assets/describe.svg" alt="历史记录" >
            </div>
            <div class="text-xl font-bold text-openai-title ml-auto">
                ChatGPT
            </div>
            <div 
                class="ml-auto cursor-pointer"
                @click="setConfig()"
            >
                <img src="../assets/setting-fill.svg" alt="设置" class="w-5">
            </div>
        </header>

        <!-- 消息列表部分 -->
        <main class="flex-1 px-2 pt-20 bg-openai-bg">
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
        </main>

        <!-- 输入框部分 -->
        <footer class="sticky bottom-0 w-full px-4 pb-8 bg-openai-bg">
            <!-- <div class="pb-2 text-sm text-gray-500" v-show="inputConfig">
                请输入API Key:
            </div> -->
            <div class="flex rounded-full h-full w-full bg-openai-input py-1 items-center">
                <input 
                    v-model="inputContent"
                    :type="inputConfig ? 'password' : 'text'"
                    :placeholder="inputConfig ? 'sh-xxxxxx' : '给 ChatGPT 发送消息'"
                    @keydown.enter="sendOrsaveConfig()"
                    class="flex-1 text-base rounded-md bg-transparent border-none focus:outline-none pl-8 py-2 text-openai-text placeholder:text-openai-text"
                />
                <button 
                    class="w-8 h-8 mr-3 text-sm bg-white rounded-full disabled:opacity-50 flex justify-center items-center cursor-pointer hover:bg-gray-100"
                    @click="sendOrsaveConfig()"
                    :disabled="!inputContent.length || isThinking"
                >
                    <img :src="inputConfig ? '@/assets/save.svg' : '@/assets/send-fill.svg'">
                </button>
            </div>
        </footer>
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