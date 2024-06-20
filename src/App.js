// src/App.js
import React, { useState, useEffect } from 'react';
import CodeEditor from './cmp/Editor';
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

  useEffect(() => {
    if (output && output.Passed !== undefined){
       setIsPassed(output.Passed)
    }
  }, [output])

  useEffect(() => {
  console.log('app loaded')
  }, [])
  
  const handleSetShareText = (text) => {
    setShareText(text);
  };

  const handleShareApp = (()=>{
    navigator.share({
      title: "Share dailyQ app",
      text: "Check out this awesome app!",
      url: 'https://dailyqpwa-nimrod-devs-projects.vercel.app/',
    });
  })

  return (
    <div className="App">
      <p className='share_header' onClick={handleShareApp}>Share App 💬</p>
      <h1 className="headline">The Daily Question:</h1>
      {output && output.Results && <Results output={output} />}

      {isPassed &&(
          <SocialShareButtons
          url="https://dailyqpwa-nimrod-devs-projects.vercel.app/" // Replace with your web app URL
          text={shareText}
          />
        )}
      <div className="q_m_wrapper">
        <ShowQuestion />
        <Medals output={output} setShareText = {handleSetShareText}/>
      </div>
      <CodeEditor code={code} setCode={setCode} />
      <SubmitBtn code={code} setOutput={setOutput} userId={userLog._id || ''}/>
    </div>
  );
}

export default App;
