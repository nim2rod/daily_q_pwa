import React, { useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { getFromLocal, setToLocal } from '../utils/localStorage'

const Editor_monaco = ({ code, setCode }) => {
    useEffect(() => {
        const savedCode = getFromLocal()
        if (savedCode) setCode(savedCode)
    }, [])

    useEffect(() => {
        setToLocal(code)
    }, [code])

    const handleEditorChange = ((value) => {
        setCode(value)
    })

    return (
            <Editor
                height="300px"
                defaultLanguage="javascript"
                defaultValue={code}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                    fontSize: 18 // Adjust this value to set the font size
                  }}
            />
    )
}

export default Editor_monaco