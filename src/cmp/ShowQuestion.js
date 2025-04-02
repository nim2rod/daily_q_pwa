import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { formatValue } from '../utils/formatVal'

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