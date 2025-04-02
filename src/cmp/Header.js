import React from 'react'

const Header = () => {
  // const handleShareApp = () => {
  //   if (navigator.share) {
  //     navigator.share({
  //       title: "Share dailyQ app",
  //       text: "Check out this awesome app!",
  //       url: 'https://dailyqpwa-nimrod-devs-projects.vercel.app/',
  //     }).catch((err) => {
  //       if (err.name !== 'AbortError') {
  //         console.error('Share failed:', err)
  //       }
  //     })
  //   } else {
  //     alert('Sharing is not supported on this browser.')
  //   }
  // }

  return (
    <>
      <div className='top-header'>
        {/* <p className='share_header' onClick={handleShareApp}>Share App 💬</p> */}
        <img src={require('.././icons/js-file.png')} alt="js-file" className="js-icon" />
      </div>
    </>
  )
}

export default Header