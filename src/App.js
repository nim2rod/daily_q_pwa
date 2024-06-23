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
  const [shareText, setShareText] = useState('');
  const [userLog, setUserLog] = useState('guest')
  const [editorProvider, setEditorProvider] = useState('mirror')
  const [editorTheme, setEditorTheme] = useState('vs-dark');

  useEffect(() => {
    if (output && output.Passed !== undefined) {
      setIsPassed(output.Passed)
    }
  }, [output])

  useEffect(() => {
    console.log('app loaded')
  }, [])

  const handleSetShareText = (text) => {
    setShareText(text);
  };

  const handleShareApp = (() => {
    navigator.share({
      title: "Share dailyQ app",
      text: "Check out this awesome app!",
      url: 'https://dailyqpwa-nimrod-devs-projects.vercel.app/',
    });
  })

  const changeEditor = (val)=>  setEditorProvider(val)
  const changeEditorTheme = (theme) => setEditorTheme(theme);


  return (
    <div className="App">
      <ShareBtn />
      <h1 className="headline">The Daily Question:</h1>
      {output && output.Results && <Results output={output} />}

      {isPassed && (
        <SocialShareButtons
          url="https://dailyqpwa-nimrod-devs-projects.vercel.app/" // Replace with your web app URL
          text={shareText}
        />
      )}
      <div className="q_m_wrapper">
        <ShowQuestion />
        <Medals output={output} setShareText={handleSetShareText} />
      </div>
      {editorProvider === 'mirror' ? (
        <CodeEditorMirror code={code} setCode={setCode} />
      ) : (
        <CodeEditorMonaco code={code} setCode={setCode} editorTheme={editorTheme}/>
      )}
      <div className="theme-editor-choose">
        <div onClick = {() => {changeEditor('vs') ; changeEditorTheme('light'); }} >⚪️</div>
        <div onClick = {() => {changeEditor('vs') ; changeEditorTheme('vs-dark'); }} >⚫️</div>
        <div onClick = {() => changeEditor('mirror')} >🟣</div>
      </div>
        <SubmitBtn code={code} setOutput={setOutput} userId={userLog._id || ''} />
    </div>
  );
}

export default App;
