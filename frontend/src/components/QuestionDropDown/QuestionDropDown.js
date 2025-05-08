export default function QuestionDropDown({ question, setQuestion, questions, setSelectedPredefinedQuestion }) {
  const handleChange = (e) => {
    setQuestion(e.target.value);
    setSelectedPredefinedQuestion(e.target.value); // ✅ this enables the submit button
  };

  return (
    <div className="question-dropdown">
      <label htmlFor="predefinedQuestion">Select a question:</label>
      <select
        id="predefinedQuestion"
        className="input-box"
        value={question}
        onChange={handleChange}
      >
        <option value="">Choose a question</option>
        {questions.map((q, index) => (
          <option key={index} value={q}>
            {q}
          </option>
        ))}
      </select>
    </div>
  );
}