// src/components/CodeEditor.js
import React, { useEffect, useRef } from 'react'
import { getFromLocal, setToLocal } from '../utils/localStorage'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/material.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/eclipse.css'
import resize from '../icons/resize.svg'
import resizeFs from '../icons/resize-fs.svg'


const CodeEditor = ({
    code,
    setCode,
    editorTheme,
    isEditorSpread,
    setIsEditorSpread,
    isEditorFullScreen,
    setIsEditorFullScreen
}) => {

    const editorRef = useRef(null)

    useEffect(() => {
        if (editorRef.current) {
            let newHeight = "300px"; // Default height

            if (isEditorFullScreen) {
                newHeight = "100vh"; // Full screen mode
            } else if (isEditorSpread) {
                newHeight = "500px"; // Expanded mode
            }

            editorRef.current.setSize("100%", newHeight);
        }
    }, [isEditorSpread, isEditorFullScreen]);  // 🔥 Depend on both states    

    useEffect(() => {
        const savedCode = getFromLocal()
        if (savedCode) setCode(savedCode)
    }, [setCode])

    useEffect(() => {
        setToLocal(code)
    }, [code])

    return (
        <div className='editor-wrapper' style={{ position: 'relative' }}>
            <CodeMirror
                value={code}
                options={{
                    mode: 'javascript',
                    theme: editorTheme,
                    lineNumbers: true,
                    lineWrapping: true,
                    // inputStyle: 'contenteditable'
                }}

                onBeforeChange={(editor, data, value) => {
                    setCode(value)
                }}
                editorDidMount={(editor) => {
                    editorRef.current = editor; // Save editor instance
                    editor.setSize("100%", isEditorSpread ? "500px" : "300px");
                }}
            />
            <img
                src={resize} alt=""
                onClick={() => {
                    if (!isEditorFullScreen) {  // Prevent toggle if full-screen is active
                        setIsEditorSpread(prev => !prev);
                    }
                }}
                style={{ backgroundColor: isEditorFullScreen && 'black' }}
            />
            <img
                src={resizeFs} alt=""
                onClick={() => setIsEditorFullScreen(!isEditorFullScreen)}
                style={{ top: '140px', padding: '5px', width: '35px' }}
            />
        </div>
    )
}

export default CodeEditor
