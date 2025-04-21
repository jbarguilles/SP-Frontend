import React from 'react'
import './Popup.css'

function Popup(props) {
  const handleClose = () => {
    props.saveDrawing(); // Save drawing before closing the popup
    props.setTrigger(false); // Close the popup
  };

  return props.trigger ? (
    <div className='popup'>
      <div className='popup-inner'>
        <button className="close-btn" onClick={handleClose}>close</button>
        <div className="popup-content">
          {props.children}
        </div>
      </div>
    </div>
  ) : null; // You can return null instead of an empty string
}


export default Popup