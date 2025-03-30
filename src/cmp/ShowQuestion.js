import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { formatValue } from '../utils/formatVal'

const ShowQuestion = () => {
    const [question, setQuestion] = useState('')
    const [inOut, setInOut] = useState([])
    const [loading, setLoading] = useState(false)
    const [explanation, setExplanation] = useState('')
    const [hasFetchedExplanation, setHasFetchedExplanation] = useState(false)

    //GET Qeustion:
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/daily-question`)
            .then(res => {
                setQuestion(res.data.question)
                setInOut(res.data.tests)
            })
            .catch(error => {
                console.log('Error fetching the daily question:, error')
            })
    }, [])

    const handleExplain = async () => {
        if (hasFetchedExplanation) return

        setLoading(true)
        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/explain`, {
                question: question,
            })
            setExplanation(res.data.explanation)
            setHasFetchedExplanation(true)
        } catch (error) {
            console.log('Error fetching the explanation:', error)
            setExplanation('Error fetching the explanation')
        }
        setLoading(false)
    }

    return (
        <>
            {!question ? (
                <span>Loading...</span>
            ) : (
                <span>{question}</span>
            )
            }
            <div 
              style={{ display: 'flex', alignItems: 'center', 
              justifyContent: 'space-between', marginInline: '10px', padding: '5px' }}
            >
                <div className="tooltip-io">
                    <span className='io' tabIndex="0">I/O</span>
                    <span className="tooltiptext-io" style={{ left: '-23px' }}>
                        {inOut.slice(0, 3).map((test, index) => (
                            < span key={index} >
                                <span className="io-label">Input:</span>
                                {/* {(typeof (test.input[0]) === 'object' && test.input[0] !== null) ? (JSON.stringify(test.input[0])) : (test.input[0])} */}
                                <span>{formatValue(test.input)}</span>
                                <span className="io-label">Output:</span>
                                {((typeof (test.output) === 'boolean' || typeof (test.output) === 'object') && test.output !== null) ? (JSON.stringify(test.output)) : (test.output)}
                                <br></br>
                            </span>
                        ))}
                    </span>
                </div>

                <div className="tooltip-io">
                    <div className='io' onClick={handleExplain}>
                        {loading ? "Thinking..." : "Help"}
                    </div>
                    {explanation && (
                        <span className="tooltiptext-io" style={{ width: '300px', right: '0' }}>
                            {explanation}
                        </span>
                    )}
                </div>
            </div>
        </>
    )
}

export default ShowQuestion