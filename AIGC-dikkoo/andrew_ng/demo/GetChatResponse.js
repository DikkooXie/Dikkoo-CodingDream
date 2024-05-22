require('dotenv').config();
const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.chatanywhere.tech/v1',
});

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