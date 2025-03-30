import React from 'react'
import axios from 'axios'

const SubmitButton = ({ code, setOutput, userId, setIsEditorFullScreen, setIsOutputShow }) => {

    const handleSubmit = async () => {
        setIsEditorFullScreen(false)

        if (userId === '') {
            const randomId = () => Math.floor(Math.random() * 10000)

            let id = localStorage.getItem("tempId")

            if (!id) {
                id = randomId()
                localStorage.setItem("tempId", id)
            }
            userId = id
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/submit-code`, { code, userId })
            setOutput(res.data)
            setIsOutputShow(true)
        } catch (error) {
            console.error('error: ', error)
            setOutput([`Error: ${error.message}`])
        }
    }

    return (
        <button className='submit-btn' onClick={handleSubmit}>Submit</button>
    )
}

export default SubmitButton