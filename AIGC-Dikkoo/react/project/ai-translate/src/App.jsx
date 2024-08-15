import { useState, useRef, useEffect } from 'react'
import LanguageSelector from './components/LanguageSelector'
import './App.css'

const App = () => {
  const [ sourceLanguage, setSourceLanguage] = useState('eng_Latn')
  const [ targetLanguage, setTargetLanguage] = useState('zho_Hans')
  const [ input, setInput] = useState('')
  const [ output, setOutput] = useState('')
  const [disabled, setDisabled] = useState(false)
  // 
  const worker = useRef(null); // 响应式 web worker 对象

  useEffect(() => {
    // 局部 onMouted
    // console.log('mounted')
    if (!worker.current) { // 避免重复创建
      worker.current = new Worker(
        new URL(
          "./worker.js", // worker.js 的路径
          import.meta.url //import.meta.url 是当前模块的绝对路径
        ),  // 第一个参数是 Web Worker 新线程执行的脚本路径
        {
          type: 'module' // worker.js 采用 ES Module 方式加载
        } // 第二个参数是 worker 的配置
      )
      console.log(worker.current)

      // 使用 “消息机制” 与 worker 通信
      worker.current.addEventListener('message', (e) => {
        console.log(e)
      })
      
      return () => {
        // onUnMounted
        // console.log('unmounted')
        if (worker.current) {
          worker.current.terminate()
        }
      }
    }
    
    return () => {
      // onUnMounted
      // console.log('unmounted')
      // worker.current = null
    }
  })

  const translate = () => {
    setDisabled(true) // 禁用按钮
    worker.current.postMessage({
      text: '请帮我翻译'
    }) // 向 worker 发送消息
  }
  
  return (
    <>
      <h1>Transformers.js</h1>
      <p>来自HuggingFace 抱抱脸社区的NLP js库，完成常见AI 任务</p>
      <p>未来端模型将大放异彩</p>
      <div className="container">
        <LanguageSelector 
          type="Source"
          defaultLanguage={sourceLanguage}
          onChange={x => setSourceLanguage(x.target.value)}
        />
        <LanguageSelector 
          type="Target"
          defaultLanguage={targetLanguage}
          onChange={x => setSourceLanguage(x.target.value)}
        />
       
      </div>
      <div className="textbox-container">
        <textarea 
          value={input}
          row={3}
          onChange={(e) => setInput(e.target.value)}  >
        </textarea>
        <textarea
          value={output}
          row={3}
          readOnly>
        </textarea>
      </div>
      <button disabled={disabled} onClick={translate}>Translate</button>
    </>
  )
}

export default App 