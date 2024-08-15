// 不能做DOM Window self = this 
import {
    pipeline,
    env
} from '@xenova/transformers'; // 引入transformers

env.allowLocalModels = false;

// es6 class 封装  翻译pipeline 类
class MyTranslationPipeline {
    // 任务类型：翻译
    static task = 'translation'
    // 翻译模型
    static model = 'Xenova/nllb-200-distilled-600M'
    // 单例化
    static instance = null
    static async getInstance(progress_callback=null) {
        if (this.instance === null) { // 如果未实例化
            this.instance = pipeline(
                this.task, 
                this.model, 
                {
                    progress_callback // 回调函数
                }
            ) // 进行实例化
        }
        return this.instance
    }
}

self.addEventListener('message', async (event) => {
    let translator = await MyTranslationPipeline.getInstance((x) => {
        console.log(x, 123132);
        self.postMessage(x);
    })

    // 开始翻译
    let output = await translator(event.data.text, {
        tgt_lang: event.data.tgt_lang,
        src_lang: event.data.src_lang,
  
        // 允许输出回调函数
        callback_function: x => {
            self.postMessage({
                status: 'update',
                output: translator.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: true })
            });
        }
    });
  
    // 发送输出内容给主线程
    self.postMessage({
        status: 'complete',
        output: output,
    });
})