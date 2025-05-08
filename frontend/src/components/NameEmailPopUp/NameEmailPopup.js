import React, { useState } from 'react';
import './nameEmailPopUp.css';

const NameEmailPopup = ({ onSubmit }) => {
  const [showPopup, setShowPopup] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      setShowErrorMessage(false);
      onSubmit({ name, email });
      setShowPopup(false);
    } else {
      setShowErrorMessage(true);
    }
  };

const handleCancel = () => {
    setShowPopup(false); // or whatever function hides the popup
};

  if (!showPopup) return null;

  return (
    <div className="overlay">
      <div className="popup">
        <h2>Enter Your Info</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="popup-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="popup-input"
          />
         {showErrorMessage && (<div style={{color: "red"}}>Please enter name and email</div>)}
         <div className="button-row">
          <button type="submit" className="popup-button">Submit</button>
          <button
            type="button"
            className="popup-button cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          </div>
          
        </form>
      </div>
    </div>
  )
};

export default NameEmailPopup;