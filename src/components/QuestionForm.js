import React, { useState } from "react";

function QuestionForm({ onSubmit }) {
  const initialFormData = {
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "correctIndex" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.prompt.trim() === "") {
      setError("Prompt cannot be empty.");
      return;
    }
    if (formData.answers.some((answer) => answer.trim() === "")) {
      setError("Answers cannot be empty.");
      return;
    }
    onSubmit(formData);
    setFormData(initialFormData);
    setError("");
  };

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            required
          />
        </label>
        {[1, 2, 3, 4].map((index) => (
          <label key={index}>
            Answer {index}:
            <input
              type="text"
              name={`answers[${index - 1}]`}
              value={formData.answers[index - 1]}
              onChange={handleChange}
              required
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
            required
          >
            {formData.answers.map((_, index) => (
              <option key={index} value={index}>
                Answer {index + 1}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
