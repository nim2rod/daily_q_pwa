import React, { useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { getFromLocal, setToLocal } from '../utils/localStorage'
import resize from '../icons/resize.svg'
import resizeFs from '../icons/resize-fs.svg'

const Editor_monaco = ({
    code, setCode,
    editorTheme,
    isEditorSpread, setIsEditorSpread,
    isEditorFullScreen, setIsEditorFullScreen
}) => {

    const editorRef = useRef(null)

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
                height={isEditorFullScreen ? '100vh' : (isEditorSpread ? '500px' : '300px')}
                defaultLanguage="javascript"
                defaultValue={code}
                onChange={handleEditorChange}
                theme={editorTheme}
                options={{
                    fontSize: 20 // Adjust this value to set the font size
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
                style={{ top: '50px', padding: '5px', width: '35px' }}
            />
        </div>
    )
}

export default Editor_monaco