import React from 'react';

export default function Feedback({ feedback }) {
  const parseFeedback = (feedback) => {
    const feedbackMatch = feedback.match(/Feedback:\s*(.+)\s*Grade:/s);
    const gradeMatch = feedback.match(/Grade:\s*(\d+)/);
    const improvementsMatch = feedback.match(/Improvement Points:\s*([\s\S]*)/);

    return {
      feedbackText: feedbackMatch ? feedbackMatch[1].trim() : feedback,
      grade: gradeMatch ? parseInt(gradeMatch[1], 10) : 'N/A',
      improvements: improvementsMatch ? improvementsMatch[1].trim().split("\n").filter(Boolean) : [],
    };
  };

  const { feedbackText, grade, improvements } = parseFeedback(feedback);

  return (
    <div className="feedback-container">
      <h3>📌 Feedback:</h3>
      <p className="feedback-text">{feedbackText}</p>
      <h4>🎖 Grade: <span className="grade">{grade} / 10</span></h4>

      {improvements.length > 0 && (
        <>
          <h4>🚩 Improvement Points:</h4>
          <ul className="improvement-list">
            {improvements.map((point, idx) => (
              <li key={idx} className="improvement-item">
                {point.replace(/^- /, "")}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}