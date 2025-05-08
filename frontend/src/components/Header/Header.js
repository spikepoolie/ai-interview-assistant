import React from 'react';
import AiAssistant from '../../images/ai-interview-logo.png';
const Header = ({ userInfo }) => {
  return (
    <div className="header-container">
        <img src={AiAssistant} alt="AI Assistant" className="aiImage" />
        <div>
            <h1>AI Interview Assistant</h1>
            {userInfo && (
            <p className="user-info">
                <span><strong>Candidate name:</strong></span> {userInfo.name} | <span><strong>Email:</strong></span> {userInfo.email}
            </p>
            )}
        </div>
    </div>
  );
}
export default Header;