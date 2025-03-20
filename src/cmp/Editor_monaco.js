import React, { useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { getFromLocal, setToLocal } from '../utils/localStorage'
import resize from '../icons/resize.svg'

const Editor_monaco = ({ code, setCode, editorTheme, isEditorSpread, setIsEditorSpread }) => {
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
        <div className='editor-wrapper' style={{ position: 'relative' }}>
            <Editor
                height={isEditorSpread ? '500px' : '300px'}
                defaultLanguage="javascript"
                defaultValue={code}
                onChange={handleEditorChange}
                theme={editorTheme}
                options={{
                    fontSize: 20 // Adjust this value to set the font size
                }}
            />
            <img src={resize} alt="" onClick={() => setIsEditorSpread(!isEditorSpread)} />
        </div>
    )
}

export default Editor_monaco