import React from 'react'
import './Modal.css'

const Modal = ({children, closeFunction}) => {
  return (
    <div className='modal'>
      <div className="modal-body">
        {children}
      </div>
    </div>
  )
}

export default Modal