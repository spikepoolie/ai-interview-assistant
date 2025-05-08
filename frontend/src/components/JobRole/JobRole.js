import React from 'react';

const jobRole = ({ questionMode, setQuestionMode }) => {
    return (
        <div className="question-mode-switch">
            <input
                type="radio"
                id="option-ai"
                className="hidden-radio"
                name="questionMode"
                value="ai"
                checked={questionMode === 'ai'}
                onChange={() => setQuestionMode('ai')}
            />
            <label htmlFor="option-ai" className={`toggle-option ${questionMode === 'ai' ? 'selected' : ''}`}>
             Generate question with AI
            </label>

            <input
                type="radio"
                id="option-predefined"
                className="hidden-radio"
                name="questionMode"
                value="predefined"
                checked={questionMode === 'predefined'}
                onChange={() => setQuestionMode('predefined')}
            />
            <label htmlFor="option-predefined" className={`toggle-option ${questionMode === 'predefined' ? 'selected' : ''}`}>
                Pick a pre-defined question
            </label>
        </div>
    );
}
export default jobRole;