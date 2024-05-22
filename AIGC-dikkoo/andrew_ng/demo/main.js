// "require"是node.js模块化内的关键字，用于引入模块

require('dotenv').config(); // 引入dotenv模块的config()方法，用于读取.env文件，将文件中的变量写入系统环境变量
const OpenAI = require('openai'); // 从node_modules中引入openai-api模块

console.log("你的OpenAI Key是:", process.env.OPENAI_API_KEY); // 打印.env文件中的OPENAI_API_KEY变量

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // process是node.js的进程对象，env是process对象的属性，用于读取系统环境变量
    baseURL: 'https://api.chatanywhere.tech/v1',
});

// async是异步函数的关键字，用于定义异步函数

async function example1() {
    
    // 反引号``是ES6的模板字符串
    // 其可以跨行定义字符串、动态解析，特别适合详细地设置prompt
    let text = `
    在许多情况下，更长的提示词可为模型提供更多的清晰度和上下文信息，
    从而使其更容易生成有意义的回复。
    但是，如果提示太长，模型可能会陷入细节中，无法准确理解问题的本质。
    `;

    // LLM的NLP能力，可以通过对话生成文本
    let prompt = `
    把用三个反引号包括的文本总结为一句话, 要求20词以内, 使用英文输出：
    \`\`\`${text}\`\`\`
    `;

    const chatCompletion = await client.chat.completions.create({
        model: 'gpt-3.5-turbo', // 适合聊天的模型 很多种
        n: 2, // n是生成的回复数量
        messages: [
            {
                role: 'user', // AI回答时所代入的角色
                content: prompt // 提示词内容，此处调用prompt
            }
        ]
    })

    // 打印生成的回复
    console.log(chatCompletion.choices); // choices是生成的回复数组，包含多个回复对象
    console.log("---------------------------------------"); // 分割线
    console.log(chatCompletion.choices[0].message.content); // 代表第一个回复对象的回复内容
}

async function example2() {
    

    let prompt = `
    您的任务是以一致的风格回答问题。

    <孩子>: 教我耐心。

    <祖父母>: 挖出最深峡谷的河流源于一处不起眼的泉眼；最宏伟的交响乐从单一的音符开始；最复杂的挂毯以一根孤独的线开始编织。

    <孩子>: 教我韧性。
    `;

    const chatCompletion = await client.chat.completions.create({
        model: 'gpt-3.5-turbo', // 适合聊天的模型 很多种
        n: 1, // n是生成的回复数量
        messages: [
            {
                role: 'user', // AI回答时所代入的角色
                content: prompt // 提示词内容，此处调用prompt
            }
        ]
    })

    // 打印生成的回复
    console.log(chatCompletion.choices[0].message.content);
}

// 调用入口函数
example2();