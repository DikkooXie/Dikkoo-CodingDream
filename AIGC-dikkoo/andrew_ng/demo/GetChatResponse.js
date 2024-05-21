// 将对话生成封装成一个函数
const getChatResponse = async function(model, n, prompt) {
    const chatCompletion = await client.chat.completions.create({
        model: model,
        n: n,
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ]
    });
    return chatCompletion.choices[0].message.content;
};