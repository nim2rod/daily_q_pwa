import React from 'react'

const ShareBtn = () => {
    const handleShare = async ()=>{
        const handleShareApp = (()=>{
            navigator.share({
              title: "Share dailyQ app",
              text: "Check out this awesome app!",
              url: 'https://dailyqpwa-nimrod-devs-projects.vercel.app/',
            });
          })
    }

  return (
      <>
       <p className='share_header' onClick={handleShareApp}>Share App 💬</p>
      </>
  )
}

export default ShareBtn