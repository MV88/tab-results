import React from 'react';

export default ({isVisible, setIsVisible, contentComponent = ""}) => {
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
        {contentComponent}
      </div>
    </div>
  </> : null
}