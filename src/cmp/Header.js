import React from 'react'
import logo from '.././icons/hourglass.png'

const Header = () => {

  return (
    <>
      <div className='top-header'>
        <img src={logo} alt="" style={{width:'26px'}}/>
        <div className="headline">The Daily Question</div>
        <img src={require('.././icons/js-file.png')} alt="js-file" className="js-icon" />
      </div>
    </>
  )
}

export default Header