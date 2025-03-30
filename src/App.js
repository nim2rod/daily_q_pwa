// src/App.js
import React, { useState, useEffect } from 'react';
import CodeEditorMirror from './cmp/Editor';
import CodeEditorMonaco from './cmp/Editor_monaco'
import ShowQuestion from './cmp/ShowQuestion';
import SubmitBtn from './cmp/SubmitButton'
import ShareBtn from './cmp/ShareBtn'
import SocialShareButtons from './cmp/SocialShareButtons'
import Results from './cmp/Results'
import Medals from './cmp/Medals'
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('')
  const [isPassed, setIsPassed] = useState(false)
  const [shareText, setShareText] = useState('')
  const [userLog] = useState('guest')
  const [editorProvider, setEditorProvider] = useState('mirror')
  const [editorTheme, setEditorTheme] = useState('dracula')
  const [isEditorSpread, setIsEditorSpread] = useState(false)
  const [isEditorFullScreen, setIsEditorFullScreen] = useState(false)

  useEffect(() => {
    if (output && output.Passed !== undefined) {
      setIsPassed(output.Passed)
    }
  }, [output])

  const handleSetShareText = (text) => {
    setShareText(text);
  };

  // const handleShareApp = (() => {
  //   navigator.share({
  //     title: "Share dailyQ app",
  //     text: "Check out this awesome app!",
  //     url: 'https://dailyqpwa-nimrod-devs-projects.vercel.app/',
  //   })
  // })

  const changeEditor = (val) => setEditorProvider(val)
  const changeEditorTheme = (theme) => setEditorTheme(theme);

  return (
    <div className="App">
      {!isEditorSpread && !isEditorFullScreen && <ShareBtn />}

      {!isEditorSpread && !isEditorFullScreen && (
        <div className="headline">The Daily Question:</div>
      )}

      {/* Results: */}
      {!isEditorFullScreen && output && output.Results && <Results output={output} />}


      {isPassed && (
        <SocialShareButtons
          url="https://dailyqpwa-nimrod-devs-projects.vercel.app/" // Replace with your web app URL
          text={shareText}
        />
      )}

      {/* Show Q +  Medals: */}
      <div className="q_m_wrapper">
        {!isEditorFullScreen && <ShowQuestion />}
        {/* <ShowQuestion /> */}
        {!isEditorSpread && !isEditorFullScreen && (
          <Medals output={output} setShareText={handleSetShareText} />
        )}
      </div>

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
          onClick={() => { changeEditor('vs'); changeEditorTheme('vs-dark'); }}
        />
        <div onClick={() => { changeEditor('mirror'); changeEditorTheme('eclipse'); }} >⚪️</div>
        <div onClick={() => { changeEditor('mirror'); changeEditorTheme('dracula'); }} >🟣</div>
      </div>

      {/* Submit Button: */}
      <SubmitBtn code={code} setOutput={setOutput} userId={userLog._id || ''} setIsEditorFullScreen={setIsEditorFullScreen} />
    </div>
  )
}

export default App;
