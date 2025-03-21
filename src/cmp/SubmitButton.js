import React from 'react'
import axios from 'axios'

const SubmitButton = ({ code, setOutput, userId, setIsEditorFullScreen }) => {
    const handleSubmit = () => {
        setIsEditorFullScreen(false)
        // axios.post('http://localhost:3030/submit-code', { code })

        if (userId === '') {
            const randomId = (() => {
                return Math.floor(Math.random() * 10000)
            })

            let id = localStorage.getItem("tempId")
            if (!id) {
                id = randomId()
                localStorage.setItem("tempId", id)
            }
            userId = id
        }
        console.log('userId: ', userId)

        axios.post(`${process.env.REACT_APP_URL}/submit-code`, { code, userId })
            .then(response => {
                // console.log('response.data: ', response.data)
                setOutput(response.data)
            })
            .catch(error => {
                setOutput([`Error: ${error.message}`])
            })
    }
    return (
        <button className='submit-btn' onClick={handleSubmit}>Submit</button>
    )
}

export default SubmitButton