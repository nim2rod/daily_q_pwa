// src/components/CodeEditor.js
import React, { useEffect } from 'react'
import { getFromLocal, setToLocal } from '../utils/localStorage'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/material.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/eclipse.css'
import resize from '../icons/resize.svg'

const CodeEditor = ({ code, setCode, editorTheme }) => {
    useEffect(() => {
        const savedCode = getFromLocal()
        if (savedCode) setCode(savedCode)
    }, [])

    useEffect(() => {
        setToLocal(code)
    }, [code])

    return (
        <div className='editor-wrapper' style={{position: 'relative'}}>
            <CodeMirror
                value={code}
                options={{
                    mode: 'javascript',
                    theme: editorTheme,
                    lineNumbers: true
                }}
                onBeforeChange={(editor, data, value) => {
                    setCode(value)
                }}
            />
            <img src={resize} alt=""/>
        </div>
    )
}

export default CodeEditor
