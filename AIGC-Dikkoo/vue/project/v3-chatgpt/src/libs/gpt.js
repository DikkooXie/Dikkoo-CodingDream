export const chat = async (messageList, apiKey) => {
    try {
        const result = await fetch("https://api.302.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // 内容类型，必须指定
                "Authorization": `Bearer ${apiKey}` // 授权信息，Bearer是JWT的一种认证方式，后面跟着token
            },
            body: JSON.stringify({ // JSON.stringify() 方法将一个 JavaScript 值（对象或者数组）转换为一个 JSON 字符串
                model: "gpt-3.5-turbo",
                messages: messageList // 传入的参数，messageList是一个数组，里面包含了用户的输入
            })
        })
    
        const data = await result.json(); // 将结果转换为json格式，await 保证异步操作的顺序，等待result返回结果
        console.log(data);
        return data.choices[0].message.content; // 返回结果，choices是返回的结果数组，取第一个元素的content字段
    } catch (error) {
        throw(error);
    }
}