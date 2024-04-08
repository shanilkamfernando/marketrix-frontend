import React from 'react'
import { Modal, Button } from "@creativehub/marketrix-ui";

function SessionReplayModal({onClose}) {
  return (
    <div className=''>
         <Modal
        background="#fff"
        borderRadius="8px"
        boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
        height="100%"
        onClose={onClose} // Close the modal on request
        show
        transition="2.5s ease-out"
        visibility="visible"
        width="100%"
      >
       <div>shanilka</div>
       <button onClick={onClose}>close</button>
      </Modal>
    </div>
  )
}

export default SessionReplayModal