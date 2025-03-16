// src/components/CodeEditor.js
import React, { useEffect } from 'react'
import { getFromLocal, setToLocal } from '../utils/localStorage'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/material.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/eclipse.css'
// import 'codemirror/theme/tokyo-night-day.css'
// import 'codemirror/theme/quietlight.css'

const CodeEditor = ({ code, setCode, editorTheme }) => {
    useEffect(() => {
        const savedCode = getFromLocal()
        if (savedCode) setCode(savedCode)
    }, [])

    useEffect(() => {
        setToLocal(code)
    }, [code])

    return (
        <CodeMirror
            value={code}
            options={{
                mode: 'javascript',
                theme: editorTheme,
                // theme: 'dracula',
                lineNumbers: true
            }}
            onBeforeChange={(editor, data, value) => {
                setCode(value)
            }}
        />
    )
}

export default CodeEditor
