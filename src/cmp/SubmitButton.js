import React from 'react'
import axios from 'axios'

const SubmitButton = ({ code, setOutput, userId }) => {
    const handleSubmit = () => {
        // axios.post('http://localhost:3030/submit-code', { code })

        if(userId === ''){
            const randomId = (()=>{
                return Math.floor(Math.random()*10000)
            })

            let id = sessionStorage.getItem("tempId") 
            if(!id) {
                id = randomId()
                sessionStorage.setItem("tempId",id)
            }
            userId = id
        }
        console.log('userId: ', userId)

        axios.post(`${process.env.REACT_APP_URL}/submit-code`, { code, userId })
            .then(response => {
                // console.log('response.data: ', response.data)
                setOutput(response.data);
            })
            .catch(error => {
                setOutput([`Error: ${error.message}`]);
            });
    };
    return (
        <button onClick={handleSubmit}>Submit</button>
    )
}

export default SubmitButton