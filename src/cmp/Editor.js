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

const CodeEditor = ({ code, setCode, editorTheme, isEditorSpread, setIsEditorSpread }) => {
    const editorRef = useRef(null)

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setSize("100%", isEditorSpread ? "500px" : "300px");
        }
    }, [isEditorSpread])  // Runs when `isEditorSpread` changes

    useEffect(() => {
        const savedCode = getFromLocal()
        if (savedCode) setCode(savedCode)
    }, [])

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
                }}
                onBeforeChange={(editor, data, value) => {
                    setCode(value)
                }}
                // style={{ height: '500px' }}
                editorDidMount={(editor) => {
                    editorRef.current = editor; // Save editor instance
                    editor.setSize("100%", isEditorSpread ? "500px" : "300px");
                }}
            />
            <img src={resize} alt="" onClick={() => setIsEditorSpread(!isEditorSpread)} />
        </div>
    )
}

export default CodeEditor
