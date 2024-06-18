import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ShowQuestion = () => {
    const [question, setQuestion] = useState('')

    //GET Qeustion:
    useEffect(() => {
        console.log('process.env.URL: ', process.env.URL)
        // axios.get('http://localhost:3030/daily-question')
        // axios.get('https://daily-q-server.vercel.app/daily-question')
        axios.get(`${process.env.REACT_APP_URL}/daily-question`)
            .then(res => {
                console.log('res.data.question: ', res.data.question)
                setQuestion(res.data.question)
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
        </>
    )
}

export default ShowQuestion