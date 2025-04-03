import React from 'react'
import logo from '.././icons/hourglass.png'

const Header = () => {

  return (
    <>
      <div className='top-header'>
        <div style={{display:'flex', alignItems: 'baseline', gap:'4px'}}>
          <img src={logo} alt="" style={{width:'22px'}}/>
          <div className="headline">The Daily Question</div>
        </div>
        <img src={require('.././icons/js-file.png')} alt="js-file" className="js-icon" />
      </div>
    </>
  )
}

export default Header