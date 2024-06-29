import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ShowQuestion = () => {
    const [question, setQuestion] = useState('')
    const [inOut, setInOut] = useState([])

    //GET Qeustion:
    useEffect(() => {
        console.log('process.env.URL: ', process.env.URL)
        // axios.get('http://localhost:3030/daily-question')
        // axios.get('https://daily-q-server.vercel.app/daily-question')
        axios.get(`${process.env.REACT_APP_URL}/daily-question`)
            .then(res => {
                console.log('res.data: ', res.data)
                setQuestion(res.data.question)
                setInOut(res.data.tests)
            })
            .catch(error => {
                console.log('Error fetching the daily question:, error')
            })
    }, [])

    return (
        <>
            {!question ? (
                <span>Loading...</span>
            ) : (
                <span>{question}</span>
            )
            }
            <div className="tooltip-io">
                <span className='io'>I/O</span>
                <span className="tooltiptext-io">
                    {inOut.slice(0, 3).map((test, index) => (
                        < span key={index} >
                            {/* <span className="io-label">Input:</span> {JSON.stringify(test.input)} */}
                            <span className="io-label">Input:</span> {test.input}
                            {/* <span className="io-label">Output:</span> {test.output} */}
                            <span className="io-label">Output:</span> {JSON.stringify(test.output)}
                            <br></br>
                        </span>
                    ))}
                </span>
            </div>
        </>
    )
}

export default ShowQuestion