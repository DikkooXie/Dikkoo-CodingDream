import { useState } from 'react'
import LanguageSelector from './components/LanguageSelector'
import './App.css'

function App() {
  const [ sourceLang, setSourceLang ] = useState('eng_Latn')
  const [ targetLang, setTargetLang ] = useState('zh-Latn')
  const [ input, setInput ] = useState('')
  const [ output, setOutput ] = useState('')

  return (
    <>
      <LanguageSelector
        type="source"
        default={sourceLang}
        onChange={(x) => setSourceLang(x.target.value)}
      />
      <LanguageSelector
        type="target"
        default={targetLang}
        onChange={(x) => setTargetLang(x.target.value)}
      />
      <div className="textbox-container">
        <textarea
          value={input}
          row={3}
          onChange={(e) => setInput(e.target.value)}
        />
        <textarea
          value={output}
          row={3}
          readOnly // AI 翻译，用户不可编辑
        />
      </div>
    </>
  )
}

export default App
