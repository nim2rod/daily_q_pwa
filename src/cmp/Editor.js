import React, { useEffect, useRef } from 'react'
import {
  EditorView,
  keymap,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  lineNumbers,
  highlightActiveLineGutter
} from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { eclipse } from '@uiw/codemirror-theme-eclipse'

import { getFromLocal, setToLocal } from '../utils/localStorage'
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
  const viewRef = useRef(null)

  useEffect(() => {
    const savedCode = getFromLocal()
    console.log('savedCode', savedCode)
    if (savedCode) setCode(savedCode)
  }, [setCode])

  useEffect(() => {
    setToLocal(code)
  }, [code])

  useEffect(() => {
    if (!editorRef.current) return

    const themes = { dracula, eclipse, oneDark }
    const currentTheme = themes[editorTheme] || oneDark

    const state = EditorState.create({
      doc: code,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        drawSelection(),
        EditorView.lineWrapping,
        highlightActiveLine(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        javascript(),
        currentTheme,
        EditorView.editable.of(true),
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            setCode(update.state.doc.toString())
          }
        })
      ]
    })

    const view = new EditorView({
      state,
      parent: editorRef.current
    })

    viewRef.current = view

  const height = isEditorFullScreen ? '100vh' : isEditorSpread ? '500px' : '300px'
  view.dom.style.height = height

    return () => {
      view.destroy()
    }
  }, [editorTheme])

  useEffect(() => {
    if (
      viewRef.current &&
      code !== viewRef.current.state.doc.toString()
    ) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: code
        }
      })
    }
  }, [code])
  

  useEffect(() => {
    if (viewRef.current) {
      const height = isEditorFullScreen ? '100vh' : isEditorSpread ? '500px' : '300px'
      viewRef.current.dom.style.height = height
    }
  }, [isEditorSpread, isEditorFullScreen])

  return (
    <div className='editor-wrapper' style={{ position: 'relative' }}>
      <div ref={editorRef} style={{ width: '100%' }} />
      <img
        src={resize} alt='resize'
        onClick={() => {
          if (!isEditorFullScreen) {
            setIsEditorSpread(prev => !prev)
          }
        }}
        style={{ backgroundColor: isEditorFullScreen && 'black' }}
      />
      <img
        src={resizeFs} alt='fullscreen'
        onClick={() => setIsEditorFullScreen(!isEditorFullScreen)}
        style={{ top: '140px', padding: '5px', width: '35px' }}
      />
    </div>
  )
}

export default CodeEditor
