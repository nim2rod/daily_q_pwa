import React from 'react';

const OutputLog = ({ output = [], logs = [] }) => {
  const formatOutput = (item) => {
    switch (typeof item){
        case 'undefined':
            return 'undefined'
        case 'object':
          return  item === null ? 'null' : handleObject(item)
        default:
            return item.toString()
    }
  }

  const handleObject = (item)=> {
    if(Array.isArray(item)) {
        return JSON.stringify(item)
    }
    const entries = Object.entries(item).map(([key, value]) => `${key}: ${value}`);
    return `{${entries.join(', ')}}`;
  }

  return (
    <div>
      <div>
        <strong>Output:</strong>
        <pre>{output.map((item, index) => <div key={index}>{formatOutput(item)}</div>)}</pre>
      </div>
      <div>
        <strong>Logs:</strong>
        <pre>{logs.map((log, index) => <div key={index}>{log}</div>)}</pre>
      </div>
    </div>
  );
};

export default OutputLog;


