import React from 'react';
import AiAssistant from '../../images/ai-interview-logo.png';
const Header = ({ userInfo }) => {
  return (
    <div className="header-container">
        <img src={AiAssistant} alt="AI Assistant" className="aiImage" />
        <div>
            <h1 className="header-title">AI Interview Assistant</h1>
            {userInfo && (
              <p className="user-info">
                <span className="info-name"><strong>Candidate:</strong> {userInfo.name}</span>
                <span className="info-email"><strong>Email:</strong> {userInfo.email}</span>
              </p>
            )}
        </div>
    </div>
  );
}
export default Header;