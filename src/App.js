// src/App.js
import React, { useState, useEffect } from 'react';
import CodeEditorMirror from './cmp/Editor';
import CodeEditorMonaco from './cmp/Editor_monaco'
import ShowQuestion from './cmp/ShowQuestion';
import Header from './cmp/Header'
import SocialShareButtons from './cmp/SocialShareButtons'
import Results from './cmp/Results'
import Medals from './cmp/Medals'
import BottomBar from './cmp/BottomBar'
import OutputLog from './cmp/OutputLog'
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [isOutputShow, setIsOutputShow] = useState(false)
  const [isPassed, setIsPassed] = useState(false)
  const [shareText, setShareText] = useState('')
  const [userLog] = useState('guest')
  const [editorProvider, setEditorProvider] = useState('mirror')
  const [editorTheme, setEditorTheme] = useState('dracula')
  const [isEditorSpread, setIsEditorSpread] = useState(false)
  const [isEditorFullScreen, setIsEditorFullScreen] = useState(false)

  const [inOut, setInOut] = useState([])
  const [loading, setLoading] = useState(false)
  const [explanation, setExplanation] = useState('')
  const [hasFetchedExplanation, setHasFetchedExplanation] = useState(false)
  const [question, setQuestion] = useState('')

  const [runCodeOutput, setRunCodeOutput] = useState([])
  const [logs, setLogs] = useState([])



  useEffect(() => {
    if (output && output.Passed !== undefined) {
      setIsPassed(output.Passed)
    }
  }, [output])

  //GET Qeustion:
  useEffect(() => {
      const fetchQuestion = async () => {
          try {
              const res = await axios.get(`${process.env.REACT_APP_URL}/daily-question`)
              setQuestion(res.data.question)
              setInOut(res.data.tests)
          } catch (error) {
              console.log('Error fetching the daily question:', error)
          }
      }

      fetchQuestion()
  }, [])

  const handleSetShareText = (text) => {
    setShareText(text);
  }

  const changeEditor = (val) => setEditorProvider(val)

  const changeEditorTheme = (theme) => setEditorTheme(theme)

  const handleExplain = async () => {
    // if (hasFetchedExplanation) return

    setLoading(true)
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL}/explain`, {
            question: question,
            code: code,
        })
        setExplanation(res.data.explanation)
        setHasFetchedExplanation(true)
    } catch (error) {
        console.log('Error fetching the explanation:', error)
        setExplanation('Error fetching the explanation')
    }
    setLoading(false)
  }

  const runCode = (userCode) => {
    setLogs([]);
    setRunCodeOutput([]);
  
    const originalConsoleLog = console.log;
  
    console.log = function (...args) {
      const formattedArgs = args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg) : arg
      ).join(' ');
      setLogs(prevLogs => [...prevLogs, formattedArgs]);
      originalConsoleLog.apply(console, args);
    }
  
    try {
      const result = eval(userCode);
      setRunCodeOutput([result]);
    } catch (error) {
      setRunCodeOutput([error.toString()]);
    }
  
    console.log = originalConsoleLog;
  }

  return (
    <div className="App">
      {!isEditorSpread && !isEditorFullScreen && <Header />}
      
      <div className="main-content">
          {/* Results: */}
          {!isEditorFullScreen && output && output.Results && isOutputShow && 
          <Results output={output} setIsOutputShow={setIsOutputShow} isOutputShow={isOutputShow}/>}

          {isPassed && (
            <SocialShareButtons
              url="https://dailyqpwa-nimrod-devs-projects.vercel.app/" // Replace with your web app URL
              text={shareText}
            />
          )}

          {/* Show Q : */}
            {!isEditorFullScreen &&(
              <div className="q_m_wrapper">
                <ShowQuestion question={question}/>
              </div>
          )} 

          {/* Editors: */}
          {editorProvider === 'mirror' ? (
            <CodeEditorMirror
              code={code}
              setCode={setCode}
              editorTheme={editorTheme}
              isEditorSpread={isEditorSpread}
              setIsEditorSpread={setIsEditorSpread}
              isEditorFullScreen={isEditorFullScreen}
              setIsEditorFullScreen={setIsEditorFullScreen}
            />
          ) : (
            <CodeEditorMonaco
              code={code}
              setCode={setCode}
              editorTheme={editorTheme}
              isEditorSpread={isEditorSpread}
              setIsEditorSpread={setIsEditorSpread}
              isEditorFullScreen={isEditorFullScreen}
              setIsEditorFullScreen={setIsEditorFullScreen}
            />
          )}

          {/* Editor Buttons:  */}
          <div className="theme-editor-choose">
            <img src={require('./icons/vs-black.png')} alt="info"
              style={{ width: 25 }}
              className="hide-on-mobile"
              onClick={() => { changeEditor('vs'); changeEditorTheme('vs-dark'); }}
            />
            <div onClick={() => { changeEditor('mirror'); changeEditorTheme('eclipse'); }} >⚪️</div>
            <div onClick={() => { changeEditor('mirror'); changeEditorTheme('dracula'); }} >🟣</div>
          </div>

          {/* Medals: */}
          {!isEditorSpread && !isEditorFullScreen && (
              <Medals output={output} setShareText={handleSetShareText} />
          )}

          <OutputLog output={runCodeOutput} logs={logs} />
      </div>

      {/* Bottom Bar: */}
      <BottomBar
        code={code}
        setOutput={setOutput}
        setIsOutputShow={setIsOutputShow}
        userLog={userLog}
        setIsEditorFullScreen={setIsEditorFullScreen}
        inOut={inOut}
        explanation={explanation}
        handleExplain={handleExplain}
        loading={loading}
        runCode={runCode}
      />

    </div>
  )
}

export default App;
