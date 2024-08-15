import { useEffect, useRef, useState } from 'react'
import LanguageSelector from './components/LanguageSelector';
import Progress from './components/Progress';
import './App.css';

function App() {

  // 模型工作状态
  const [ready, setReady] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [progressItems, setProgressItems] = useState([]);

  // 输入输出
  const [input, setInput] = useState('I love walking my dog.');
  const [sourceLanguage, setSourceLanguage] = useState('eng_Latn');
  const [targetLanguage, setTargetLanguage] = useState('fra_Latn');
  const [output, setOutput] = useState('');

  // 创建一个 worker 的引用
  const worker = useRef(null);

  // 在组件挂载时创建 worker
  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(new URL('./worker.js', import.meta.url), {
          type: 'module'
      });
    }

    // 定义一个回调函数，用于处理从 worker 接收到的消息
    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case 'initiate':
          // 模型文件加载进度：添加一个进度条
          setReady(false);
          setProgressItems(prev => [...prev, e.data]);
          break;
    
        case 'progress':
          // 模型文件加载进度：更新进度条
          setProgressItems(
            prev => prev.map(item => {
              if (item.file === e.data.file) {
                return { ...item, progress: e.data.progress }
              }
              return item;
            })
          );
          break;
    
        case 'done':
          // 模型文件加载进度：移除进度条
          setProgressItems(
            prev => prev.filter(item => item.file !== e.data.file)
          );
          break;
    
        case 'ready':
          // 模型加载完成
          setReady(true);
          break;
    
        case 'update':
          // 翻译进度：更新输出
          setOutput(e.data.output);
          break;
    
        case 'complete':
          // 翻译完成：解除按钮禁用
          setDisabled(false);
          break;
      }
    };

    // 创建一个监听器，用于监听 worker 发送的消息
    worker.current.addEventListener('message', onMessageReceived);

    // 在组件卸载时，移除监听器
    return () => worker.current.removeEventListener('message', onMessageReceived);
  });

  const translate = () => {
    setDisabled(true);
    worker.current.postMessage({
      text: input,
      src_lang: sourceLanguage,
      tgt_lang: targetLanguage,
    });
  }

  return (
    <>
      <h1>Transformers.js</h1>
      <h2>ML-powered multilingual translation in React!</h2>

      <div className='container'>
        <div className='language-container'>
          <LanguageSelector type={"Source"} defaultLanguage={"eng_Latn"} onChange={x => setSourceLanguage(x.target.value)} />
          <LanguageSelector type={"Target"} defaultLanguage={"fra_Latn"} onChange={x => setTargetLanguage(x.target.value)} />
        </div>

        <div className='textbox-container'>
          <textarea value={input} rows={3} onChange={e => setInput(e.target.value)}></textarea>
          <textarea value={output} rows={3} readOnly></textarea>
        </div>
      </div>

      <button disabled={disabled} onClick={translate}>Translate</button>

      <div className='progress-bars-container'>
        {ready === false && (
          <label>Loading models... (only run once)</label>
        )}
        {progressItems.map(data => (
          <div key={data.file}>
            <Progress text={data.file} percentage={data.progress} />
          </div>
        ))}
      </div>
    </>
  )
}

export default App