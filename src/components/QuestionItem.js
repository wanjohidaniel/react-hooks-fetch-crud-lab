import React from "react";

function QuestionItem({ question, onDelete, onCorrectIndexChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleCorrectIndexChange = (e) => {
    const newCorrectIndex = parseInt(e.target.value);
    if (newCorrectIndex !== correctIndex) {
      onCorrectIndexChange(id, newCorrectIndex);
    }
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <li className="question-item">
      <h4>Question {id}</h4>
      <div className="question-prompt">
        <h5>Prompt: {prompt}</h5>
      </div>
      <div className="correct-answer">
        <label>
          Correct Answer:
          <select
            value={correctIndex}
            onChange={handleCorrectIndexChange}
          >
            {answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button className="delete-button" onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
