import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Feedback from './Feedback';
import jobRoles from '../files/jobRoles.json';
import NameEmailPopup from './NameEmailPopUp/NameEmailPopup';
import Header from './Header/Header';
import JobRole from './JobRole/JobRole';
import QuestionDropDown from './QuestionDropDown/QuestionDropDown';
import Overlay from './Overlay/Overlay';
import JobRoleSelection from './JobRoleSelection/JobRoleSelection';
import QuestionContainer from './QuestionContainer/QuestionContainer';

export default function Interview() {
  const [jobRole, setJobRole] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [typeJobRole, setTypeJobRole] = useState(true);
  const [customQuestion, setCustomQuestion] = useState('');
  const [questionMode, setQuestionMode] = useState('ai');
  const [selectedPredefinedQuestion, setSelectedPredefinedQuestion] = useState('');
  const [showPastePopup, setShowPastePopup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const feedbackRef = useRef(null);

  const normalizedJobRoleKey = Object.keys(jobRoles).find(
    (key) => key.toLowerCase().trim() === jobRole.toLowerCase().trim()
  );

  useEffect(() => {
  if (feedbackRef.current) {
    feedbackRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [feedback]);

  useEffect(() => {
    if (jobRole && questionMode === 'ai') {
      fetchQuestion();
    }
  }, [jobRole, questionMode]);

  const handleUserSubmit = ({ name, email }) => {
    console.log('Received from popup:', name, email);
    setUserInfo({ name, email });
  };

  const SwitchView = () => {
    setTypeJobRole(!typeJobRole);
    setJobRole('');
    setQuestion('');
    setAnswer('');
    setFeedback('');
    setCustomQuestion('');
    setQuestionMode('ai');
    setSelectedPredefinedQuestion('');
  };

  const enableSubmitAnswer = () => {
    if (questionMode === 'ai') {
      return question && answer;
    } else if (questionMode === 'predefined') {
      return selectedPredefinedQuestion && answer;
    }
    return false;
  };

  const handleClosePopup = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowPastePopup(false);
      setFadeOut(false);
    }, 300);
  };

  const fetchQuestion = async () => {
    if (questionMode !== 'ai') return;
    setLoading(true);
    setFeedback('');
    setAnswer('');
    try {
      const baseUrl = process.env.REACT_APP_API_URL || '';
      const res = await axios.post(`${baseUrl}/api/question`, { jobRole });
      setQuestion(res.data.question);
    } catch (err) {
      console.error(err);
      alert('Error fetching question');
    }
    setLoading(false);
  };

  const submitAnswer = async () => {
    setSubmittingAnswer(true);
    const q = customQuestion || selectedPredefinedQuestion || question;
    try {
      const baseUrl = process.env.REACT_APP_API_URL || '';
      const res = await axios.post(`${baseUrl}/api/feedback`, { question: q, answer });
      setFeedback(res.data.feedback);
    } catch (err) {
      console.error(err);
      alert('Error getting feedback');
    }
    setSubmittingAnswer(false);
  };

  return (
    <div className="interview-container">
      <Header userInfo={userInfo} />
     
      {!userInfo && <NameEmailPopup onSubmit={handleUserSubmit} />}

      <JobRoleSelection
        typeJobRole={typeJobRole}
        setTypeJobRole={setTypeJobRole}
        jobRole={jobRole}
        setJobRole={setJobRole}
        jobRoles={jobRoles}
        SwitchView={SwitchView}
      />

      {jobRole && (
        <JobRole questionMode={questionMode} setQuestionMode={setQuestionMode} />
      )}

      {questionMode === 'predefined' && (
        <>
          {console.log('Using key:', jobRole, '→', normalizedJobRoleKey)}
          <QuestionDropDown
            question={question}
            setQuestion={setQuestion}
            questions={jobRoles[normalizedJobRoleKey].map((item) => item.question)}
            setSelectedPredefinedQuestion={setSelectedPredefinedQuestion}
          />
        </>
      )}

      {(question || customQuestion || selectedPredefinedQuestion) && (
        <QuestionContainer
          questionMode={questionMode}
          submitAnswer={submitAnswer}
          typeJobRole={typeJobRole}
          fetchQuestion={fetchQuestion}
          question={question}
          setQuestion={setQuestion}
          customQuestion={customQuestion}
          setCustomQuestion={setCustomQuestion}
          loading={loading}
          setAnswer={setAnswer}
          setFeedback={setFeedback}
          answer={answer}
          setFadeOut={setFadeOut}
          enableSubmitAnswer={enableSubmitAnswer}
          setShowPastePopup={setShowPastePopup}
        />
      )}

      {feedback && (
        <div ref={feedbackRef}>
          <Feedback feedback={feedback} />
        </div>
      )}

      {(loading || submittingAnswer) && (
        <Overlay loading={loading } />
      )}

      {showPastePopup && (
        <div className={`paste-popup-overlay ${fadeOut ? 'fade-out' : 'fade-in'}`}>
          <div className="paste-popup">
            <p>🚫 Pasting is disabled. Please type your answer manually.</p>
            <button onClick={handleClosePopup} className="close-popup-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}