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

const main = async () => {
    const text = `
    泡一杯茶很容易。首先，需要把水烧开。
    在等待期间，拿一个杯子并把茶包放进去。
    一旦水开，就把沸水倒入杯子里。
    等待几分钟，直到茶变得足够浓，之后取出茶包。
    如果你愿意，可以加一些糖或牛奶，甚至来片柠檬。
    就这样，您可以享受一杯美味的茶了。
    `;

    const prompt = `
    你将获得一段由三个单引号包围的文本:
    '''
    ${text}
    '''
    如果它包含一系列的指令，则需按照特定格式（格式已用两个反引号包围）重新编写这些指令：
    \\\\
    目的：[指令的目的]
    第一步 - ...
    第二步 - ...
    ...
    第N步 - ...(N为最后一步的编号)
    \\\\
    如果它不包含一系列的指令，则直接输出“未提供指令”。
    请按照上述要求输出。
    `;

    chatResponse = await getChatResponse('gpt-3.5-turbo', 1, prompt);
    console.log(chatResponse);
}

main();