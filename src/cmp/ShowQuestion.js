import React from 'react'

const ShowQuestion = ({question}) => {
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