import React from "react";
import axios from "axios";

const QuestionContainer = (
    { questionMode, submitAnswer, typeJobRole, fetchQuestion,
         question, setQuestion, customQuestion, setCustomQuestion, 
         loading, setAnswer, setFeedback, answer, setFadeOut, enableSubmitAnswer, setShowPastePopup
    }) => {
    return (
        <div className="question-container">
          {(questionMode === 'ai' || (questionMode !== 'predefined' && typeJobRole)) && (
            <div className="question-answer-button">
              <h3 style={{ margin: 0 }}>Question:</h3>
              {questionMode === 'ai' && question && (
                <button type="button" onClick={fetchQuestion} title="Regenerate question" className="clearRefreshButton">
                  🔄
                </button>
              )}
            </div>
          )}

          {(questionMode === 'ai' || (questionMode !== 'predefined' && typeJobRole)) && (
            <textarea
              className="textarea-box"
              value={questionMode === 'ai' ? question : customQuestion}
              rows={6}
              onChange={(e) => {
                if (questionMode === 'ai') setQuestion(e.target.value);
                else setCustomQuestion(e.target.value);
              }}
              placeholder="Type your own interview question here"
            />
          )}

          <div className="question-answer-button">
            <h3 style={{ margin: 0 }}>Answer:</h3>
            <button
              type="button"
              onClick={() => {
                setAnswer('');
                setFeedback('');
              }}
              title="Clear question and answer"
              className="clearRefreshButton"
            >
              ❌
            </button>
          </div>

          <textarea
            className="textarea-box"
            placeholder="Type your answer here"
            rows={6}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onPaste={(e) => {
                e.preventDefault();
                setFadeOut(true);
              const pastedText = e.clipboardData.getData('text');
              const baseUrl = process.env.REACT_APP_API_URL || '';
              axios.post(`${baseUrl}/api/log-paste`, { pastedText, question });
              setFadeOut(false);
              setShowPastePopup(true);
            }}
            onContextMenu={(e) => e.preventDefault()}
          />

          <button className="btn" onClick={submitAnswer} disabled={loading || !answer || !enableSubmitAnswer()}>
            {loading ? 'Evaluating...' : 'Submit Answer'}
          </button>
        </div>
    );
}
export default QuestionContainer;