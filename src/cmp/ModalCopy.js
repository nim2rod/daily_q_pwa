import React from 'react'

const ModalCopy = ({show}) => {
if(!show) return null

  return (
    <div className="modal-overlay">
        <p className="modal">
            content copied, <br/>
            you can past it on socials!
        </p>
    </div>
  )
}

export default ModalCopy