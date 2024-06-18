import React from 'react'

const ShareBtn = () => {
    const handleShare = async ()=>{
        try {
            await navigator.share({
                title: 'Daily Q',
                text: 'i solved the daily question!',
                // url: url,
            })
            console.log('Content shared successfully')
        } catch (error) {
            console.error('Error share ', error)
        }
    }

  return (
        <button onClick={handleShare}>
            Share
        </button>
  )
}

export default ShareBtn