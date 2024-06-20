import React from 'react'

const ShareBtn = () => {
        const handleShareApp = (()=>{
            navigator.share({
              title: "Share dailyQ app",
              text: "Check out this awesome app!",
              url: 'https://dailyqpwa-nimrod-devs-projects.vercel.app/',
            });
          })
    

  return (
      <>
       <p className='share_header' onClick={handleShareApp}>Share App 💬</p>
       <img src={require('.././icons/js-file.png')} alt="js-file" className="js-icon" />
      </>
  )
}

export default ShareBtn