// src/components/CodeEditor.js
import React,{useEffect} from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import {getFromLocal, setToLocal} from '../utils/localStorage'

const CodeEditor = ({ code, setCode }) => {
    useEffect(() => {
      const savedCode = getFromLocal()
      if(savedCode) setCode(savedCode)
    }, [])
    
    useEffect(() => {
    setToLocal(code)
      }, [code])

    return (
        <CodeMirror
            value={code}
            options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true
            }}
            onBeforeChange={(editor, data, value) => {
                setCode(value);
            }}
        />
    );
};

export default CodeEditor;
