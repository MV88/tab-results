import React from 'react';

export default ({isVisible, setIsVisible}) => {
  const onClose = () => {
    setIsVisible(false);
  }
  return isVisible ? <>
    <div id="myModal" className="modal"
      onClick={(e) => {
        const modal = document.getElementById("myModal");
        if (e.target === modal) {
          onClose();
        }
    }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  </> : null
}