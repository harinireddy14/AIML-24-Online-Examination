import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";

import {
  getTrueFalseQuestions,
  addTrueFalseQuestion,
  updateTrueFalseQuestion,
  deleteTrueFalseQuestion,
} from "../../services/trueFalseService";

const TrueFalseQuestions = () => {
  const emptyQuestion = {
    question: "",
    correctAnswer: true,
    marks: 5,
  };

  const [questions, setQuestions] = useState([]);
  const [questionData, setQuestionData] = useState(emptyQuestion);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  // LOAD QUESTIONS
  const loadQuestions = async () => {
    try {
      const response = await getTrueFalseQuestions();
      setQuestions(response.data);
    } catch (error) {
      console.log("Error loading questions:", error);
      alert("Failed to Load True/False Questions");
    }
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setQuestionData({
      ...questionData,
      [name]:
        name === "correctAnswer"
          ? value === "true"
          : name === "marks"
          ? Number(value)
          : value,
    });
  };

  // ADD OR UPDATE QUESTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateTrueFalseQuestion(
          editingId,
          questionData
        );

        alert(
          "True/False Question Updated Successfully!"
        );
      } else {
        await addTrueFalseQuestion(questionData);

        alert(
          "True/False Question Added Successfully!"
        );
      }

      setQuestionData(emptyQuestion);
      setEditingId(null);

      await loadQuestions();

    } catch (error) {
      console.log("Save Question Error:", error);

      alert(
        editingId
          ? "Failed to Update Question"
          : "Failed to Add Question"
      );
    }
  };

  // EDIT QUESTION
  const handleEdit = (item) => {
    setEditingId(item.questionId);

    setQuestionData({
      question: item.question,
      correctAnswer: item.correctAnswer,
      marks: item.marks,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditingId(null);
    setQuestionData(emptyQuestion);
  };

  // DELETE QUESTION
  const handleDelete = async (questionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteTrueFalseQuestion(questionId);

      alert(
        "True/False Question Deleted Successfully!"
      );

      await loadQuestions();

    } catch (error) {
      console.log("Delete Question Error:", error);

      alert(
        "Failed to Delete True/False Question"
      );
    }
  };

  return (
    <div className="dashboard-content">

      <h1>✅ True / False Questions</h1>

      <p>
        Create and manage True or False questions
        for online examinations.
      </p>

      {/* ADD / EDIT FORM */}

      <div className="card">

        <h2>
          {editingId
            ? "✏️ Edit True / False Question"
            : "➕ Add True / False Question"}
        </h2>

        <form onSubmit={handleSubmit}>

          <h3>Question</h3>

          <textarea
            name="question"
            placeholder="Enter True or False question"
            value={questionData.question}
            onChange={handleChange}
            rows="4"
            style={{
              width: "100%",
              boxSizing: "border-box",
            }}
            required
          />

          <br />
          <br />

          <h3>Correct Answer</h3>

          <select
            name="correctAnswer"
            value={String(
              questionData.correctAnswer
            )}
            onChange={handleChange}
          >
            <option value="true">
              True
            </option>

            <option value="false">
              False
            </option>
          </select>

          <br />
          <br />

          <h3>Marks</h3>

          <input
            type="number"
            name="marks"
            min="1"
            value={questionData.marks}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >

            <button
              type="submit"
              className="login-btn"
            >
              {editingId
                ? "💾 Update Question"
                : "➕ Add Question"}
            </button>

            {editingId && (
              <button
                type="button"
                className="login-btn"
                onClick={handleCancelEdit}
              >
                ❌ Cancel Edit
              </button>
            )}

          </div>

        </form>

      </div>

      <br />

      {/* AVAILABLE QUESTIONS */}

      <h2>📚 Available Questions</h2>

      <div className="cards">

        {questions.length === 0 ? (

          <div className="card">
            <p>
              No True/False Questions Available
            </p>
          </div>

        ) : (

          questions.map((item, index) => (

            <div
              className="card"
              key={item.questionId}
            >

              <h3>
                Question {index + 1}
              </h3>

              <p>
                {item.question}
              </p>

              <p>
                <strong>
                  Correct Answer:
                </strong>{" "}

                {item.correctAnswer
                  ? "True"
                  : "False"}
              </p>

              <p>
                <strong>Marks:</strong>{" "}
                {item.marks}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >

                <button
                  className="login-btn"
                  onClick={() =>
                    handleEdit(item)
                  }
                >
                  ✏️ Edit
                </button>

                <button
                  className="login-btn"
                  onClick={() =>
                    handleDelete(
                      item.questionId
                    )
                  }
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      <br />

      <Link to="/admin/dashboard">

        <button className="login-btn">
          ← Back to Dashboard
        </button>

      </Link>

    </div>
  );
};

export default TrueFalseQuestions;