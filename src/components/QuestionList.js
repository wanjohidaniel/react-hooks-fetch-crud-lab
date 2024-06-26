import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleAddQuestion = async (formData) => {
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add new question");
      }
      const newQuestion = await response.json();
      setQuestions([...questions, newQuestion]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete question");
      }
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCorrectIndexChange = async (id, correctIndex) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex }),
      });
      if (!response.ok) {
        throw new Error("Failed to update correct answer");
      }
      setQuestions(
        questions.map((question) =>
          question.id === id ? { ...question, correctIndex } : question
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <QuestionForm onSubmit={handleAddQuestion} />
      <button onClick={() => setLoading(true)}>View Questions</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              onDelete={handleDeleteQuestion}
              onCorrectIndexChange={handleCorrectIndexChange}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default QuestionList;
