import React from 'react'
import { ChevronsLeftRightEllipsis, FileQuestion, Share2, Play } from 'lucide-react'
import { formatValue } from '../utils/formatVal'
import SubmitBtn from './SubmitButton'


const BottomBar = ({
    code,
    setOutput,
    setIsOutputShow,
    userLog,
    setIsEditorFullScreen,
    inOut,
    explanation,
    handleExplain,
    loading,
    runCode,
}) => {

  const handleShareApp = () => {
    if (navigator.share) {
        navigator.share({
        title: "Share dailyQ app",
        text: "Check out this awesome app!",
        url: 'https://dailyqpwa-nimrod-devs-projects.vercel.app/',
        }).catch((err) => {
        if (err.name !== 'AbortError') {
            console.error('Share failed:', err)
        }
        })
    } else {
        alert('Sharing is not supported on this browser.')
    }
  } 

  return (
    <div className="bottom-bar">

        {/* I/O Button */}
        <div className="tooltip-io">
            <span className="bottom-bar-btn" tabIndex="0">
                <ChevronsLeftRightEllipsis size={16}/>
                I/O
            </span>
            <span className="tooltiptext-io" style={{ left: '-23px' }}>
                {inOut.slice(0, 3).map((test, index) => (
                <span key={index}>
                    <span className="io-label">Input:</span>
                    <span>{formatValue(test.input)}</span>
                    <span className="io-label">Output:</span>
                    {((typeof (test.output) === 'boolean' || typeof (test.output) === 'object') && test.output !== null)
                    ? JSON.stringify(test.output)
                    : test.output}
                    <br />
                </span>
                ))}
            </span>
        </div>

        {/* Help Button */}
        <div className="tooltip-io">
            <div className="bottom-bar-btn" onClick={handleExplain}>
                <FileQuestion />
                {/* <BadgeHelp size={14}/> */}
                {loading ? "Thinking..." : "Explain"}
            </div>
            {explanation && (
                <span className="tooltiptext-io" style={{ width: '300px', left: '-80%' }}>
                    {explanation}
                </span>
            )}
        </div>

        {/* Submit Button */}
        <SubmitBtn 
            code={code} 
            setOutput={setOutput} 
            setIsOutputShow={setIsOutputShow}
            userId={userLog._id || ''} 
            setIsEditorFullScreen={setIsEditorFullScreen} 
            className="bottom-bar-btn" // make sure SubmitBtn accepts className
        />

        {/* Share Button */}
        <div className="tooltip-io">
            <div className="bottom-bar-btn" onClick={handleShareApp}>
                <Share2 size={14}/>
                   Share
            </div>
        </div>

        <div className="tooltip-io">
            <div className="bottom-bar-btn" onClick={()=>runCode(code)}>
                <Play size={14}/>
                Run
            </div>
        </div>
    </div>
  )
}

export default BottomBar