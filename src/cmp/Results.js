// src/cmp/Results.js
import React from 'react'

const Results = ({ output }) => {
    const { Passed, Results, solvedCount } = output

    return (
        <div>
            {Passed ? (
                <div>
                    <h2>Congratulations! You solved the question correctly!</h2>
                    <h4>Only {solvedCount} users solved today! </h4>
                </div>
            ) : (
                <div>
                    <h2>Sorry, your solution is incorrect. Try again!</h2>
                    <h3>Test Results:</h3>
                    {/* <ul>
                {Results.map((test, index) => (
                    <li key={index}>
                        <strong>Input:</strong> {JSON.stringify(test.input)} | 
                        <strong>Expected Output:</strong> {test.output} | 
                        <strong>Your Output:</strong> {test.result} | 
                        <strong>Passed:</strong> {test.passed ? 'Yes' : 'No'}
                    </li>
                ))}
            </ul> */}
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Input</th>
                                <th>Expected Output</th>
                                <th>Your Output</th>
                                <th>Passed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Results.map((test, index) => (
                                <tr key={index}>
                                    <td>{JSON.stringify(test.input)}</td>
                                    <td>{test.output}</td>
                                    <td>{test.result}</td>
                                    <td style={{textAlign:'center'}}>
                                        <span className={test.passed ? 'pass-badge' : 'fail-badge'}>
                                            {test.passed ? '✅ ' : '❌ '}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    )
}

export default Results
