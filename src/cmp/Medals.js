// Medals.js: 
import React, { useState, useEffect, useCallback } from 'react'
import { Info } from 'lucide-react';

const Medals = ({ output, setShareText }) => {
    const [streak, setStreak] = useState(0)
    const [medals, setMedals] = useState([])
    const [lastDateSolved, setLastDateSolved] = useState('')

    const getCurrentDate = (offset = 0) => {
        const date = new Date()
        date.setDate(date.getDate() + offset)
        return date.toISOString().split('T')[0]
    }

    const loadDataFromStorage = () => { // Load from l-storage
        const streak = localStorage.getItem('streak')
        const lastSolvedDate = localStorage.getItem('lastSolvedDate')
        const medals = JSON.parse(localStorage.getItem('medals')) || []

        return {
            streak: streak ? parseInt(streak, 10) : 0,
            lastSolvedDate: lastSolvedDate || '',
            medals
        }
    }

    const saveDataToStorage = (streak, date, medals) => { // Set to l-storage
        localStorage.setItem('streak', streak)
        localStorage.setItem('lastSolvedDate', date)
        localStorage.setItem('medals', JSON.stringify(medals))
    }

    const setDataWhenMount = useCallback(() => {
        const { streak, lastSolvedDate, medals } = loadDataFromStorage()
        setStreak(streak)
        setMedals(medals)
        setLastDateSolved(lastSolvedDate)
    }, [])


    const updateStreakAndMedals = useCallback(() => {
        const currentDate = getCurrentDate()

        if (lastDateSolved === currentDate) { // today allready solved - not need to di anything.
            // Update share text
            if (streak === 1) {
                setShareText(`I just solved today's coding question on Daily Q!\nOnly ${output.solvedCount} solved today`)
            } else {
                setShareText(`I just solved today's coding question on Daily Q!\n${streak} days in a row!\nOnly ${output.solvedCount} solved today`)
            }
            return
        } else {
            const newStreak = lastDateSolved === getCurrentDate(-1) ? streak + 1 : 1
            let newMedals = [...medals] // []

            if ((newStreak % 5) === 0) {
                newMedals.push('🏅')
            } else if ((newStreak % 5) === 3) {
                newMedals.push('🥉')
            }

            setStreak(newStreak) // 1 
            setMedals(newMedals) // []
            setLastDateSolved(currentDate)
            saveDataToStorage(newStreak, currentDate, newMedals) //1 ,today, []

            // Update share text
            if (newStreak === 1) {
                setShareText(`I just solved today's coding question on Daily Q!\nOnly ${output.solvedCount} solved today!`)
            } else {
                setShareText(`I just solved today's coding question on Daily Q!\n${newStreak} days in a row!\nOnly ${output.solvedCount} solved today!`)
            }
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastDateSolved, medals, streak, setShareText])

    useEffect(() => {
        setDataWhenMount()
    }, [setDataWhenMount])

    useEffect(() => {
        if (output && output.Passed) {
            updateStreakAndMedals()
        }
    }, [output, updateStreakAndMedals])

    return (
        <div className="medalsCmp">
            {streak !== 0 && (
                <span className="daysSolved">You solved {streak} days in a row!</span>
            )}
                <>
                    <div className="tooltip">
                        <strong>Medals Earned:
                            {medals.length ? medals.join(', ') : <span style={{marginLeft:'5px', fontWeight:'300'}}>0</span>}
                            {/* <img src={require('.././icons/info.png')} alt="info" className="info-icon" /> */}
                            <Info size={22} className="info-icon"/>
                        </strong>
                       <span className="tooltiptext">
                            Earn medals by solving questions:<br />
                            3 days in a row: 🥉 <br />
                            5 days in a row: 🏅
                        </span>
                    </div>
                </>
        </div>
    )
}

export default Medals