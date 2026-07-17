import { useEffect, useState } from "react";
import "../../assets/styles/dashboard.css";

import {
  getQuestions,
  addQuestion,
  deleteQuestion,
} from "../../services/questionService";

import { getQuizzes } from "../../services/quizService";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const [question, setQuestion] = useState({
    content: "",
    image: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    quiz: {
      quizId: "",
    },
  });

  useEffect(() => {
    loadQuestions();
    loadQuizzes();
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await getQuestions();
      setQuestions(response.data);
    } catch (error) {
      console.log("Question Error:", error);
    }
  };

  const loadQuizzes = async () => {
    try {
      const response = await getQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      console.log("Quiz Error:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "quiz") {
      setQuestion({
        ...question,
        quiz: {
          quizId: Number(e.target.value),
        },
      });
    } else {
      setQuestion({
        ...question,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    if (
      !question.content ||
      !question.option1 ||
      !question.option2 ||
      !question.option3 ||
      !question.option4 ||
      !question.answer ||
      !question.quiz.quizId
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await addQuestion(question);

      alert("Question Added Successfully");

      setQuestion({
        content: "",
        image: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
        quiz: {
          quizId: "",
        },
      });

      loadQuestions();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Question");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);

      alert("Question Deleted Successfully");

      loadQuestions();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Question");
    }
  };

  return (
    <div className="dashboard-content">

      <h1>❓ Manage Questions</h1>

      <div className="card">

        <h2>Add New Question</h2>

        <textarea
          name="content"
          placeholder="Enter Question"
          value={question.content}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="option1"
          placeholder="Option 1"
          value={question.option1}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="option2"
          placeholder="Option 2"
          value={question.option2}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="option3"
          placeholder="Option 3"
          value={question.option3}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="option4"
          placeholder="Option 4"
          value={question.option4}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="answer"
          placeholder="Correct Answer"
          value={question.answer}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="quiz"
          value={question.quiz.quizId}
          onChange={handleChange}
        >
          <option value="">Select Quiz</option>

          {quizzes.map((q) => (
            <option
              key={q.quizId}
              value={q.quizId}
            >
              {q.title}
            </option>
          ))}
        </select>

        <br /><br />

        <button
          className="login-btn"
          onClick={handleSubmit}
        >
          Add Question
        </button>

      </div>

      <br />

      <h2>Available Questions</h2>

      {questions.length === 0 ? (
        <div className="card">
          <p>No Questions Found</p>
        </div>
      ) : (
        questions.map((q) => (
          <div
            className="card"
            key={q.quesId}
          >

            <h3>{q.content}</h3>

            <p>A. {q.option1}</p>
            <p>B. {q.option2}</p>
            <p>C. {q.option3}</p>
            <p>D. {q.option4}</p>

            <p>
              <strong>Correct Answer:</strong> {q.answer}
            </p>

            <p>
              <strong>Quiz:</strong>{" "}
              {q.quiz?.title || "No Quiz"}
            </p>

            <button
              className="login-btn"
              onClick={() => handleDelete(q.quesId)}
            >
              Delete Question
            </button>

          </div>
        ))
      )}

    </div>
  );
};

export default Questions;