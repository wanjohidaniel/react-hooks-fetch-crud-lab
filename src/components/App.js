import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const App = () => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  };

  const updateCorrectAnswer = (id, correctIndex) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, correctIndex };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <QuestionForm addQuestion={addQuestion} />
      <QuestionList
        questions={questions}
        deleteQuestion={deleteQuestion}
        updateCorrectAnswer={updateCorrectAnswer}
      />
    </div>
  );
};

export default App;
