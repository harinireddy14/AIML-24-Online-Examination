import { useEffect, useState } from "react";
import "../../assets/styles/dashboard.css";

import {
  getQuizzes,
  addQuiz,
  deleteQuiz,
} from "../../services/quizService";

import { getCategories } from "../../services/categoryService";

const Quizzes = () => {

  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    numOfQuestions: 10,
    iActive: true,
    category: {
      catId: "",
    },
  });

  useEffect(() => {
    loadQuizzes();
    loadCategories();
  }, []);

  const loadQuizzes = async () => {
    try {
      const response = await getQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      console.log("Quiz Error:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.log("Category Error:", error);
    }
  };

  const handleChange = (e) => {

    if (e.target.name === "category") {
      setQuiz({
        ...quiz,
        category: {
          catId: Number(e.target.value),
        },
      });
    } else {
      setQuiz({
        ...quiz,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {

    if (!quiz.title || !quiz.category.catId) {
      alert("Please enter quiz title and select category");
      return;
    }

    try {

      await addQuiz(quiz);

      alert("Quiz Added Successfully");

      setQuiz({
        title: "",
        description: "",
        numOfQuestions: 10,
        iActive: true,
        category: {
          catId: "",
        },
      });

      loadQuizzes();

    } catch (error) {

      console.log(error);
      alert("Failed to Add Quiz");

    }
  };

  const handleDelete = async (id) => {

    try {

      await deleteQuiz(id);

      alert("Quiz Deleted Successfully");

      loadQuizzes();

    } catch (error) {

      console.log(error);
      alert("Failed to Delete Quiz");

    }
  };

  return (
    <div className="dashboard-content">

      <h1>📝 Manage Quizzes</h1>

      <div className="card">

        <h2>Add New Quiz</h2>

        <input
          type="text"
          name="title"
          placeholder="Quiz Title"
          value={quiz.title}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Quiz Description"
          value={quiz.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="numOfQuestions"
          placeholder="Number of Questions"
          value={quiz.numOfQuestions}
          onChange={handleChange}
          min="1"
        />

        <br /><br />

        <select
          name="category"
          value={quiz.category.catId}
          onChange={handleChange}
        >

          <option value="">
            Select Category
          </option>

          {categories.map((cat) => (
            <option
              key={cat.catId}
              value={cat.catId}
            >
              {cat.title}
            </option>
          ))}

        </select>

        <br /><br />

        <button
          className="login-btn"
          onClick={handleSubmit}
        >
          Add Quiz
        </button>

      </div>

      <br />

      <h2>Available Quizzes</h2>

      {quizzes.length === 0 ? (

        <div className="card">
          <p>No Quizzes Found</p>
        </div>

      ) : (

        quizzes.map((q) => (

          <div
            className="card"
            key={q.quizId}
          >

            <h2>{q.title}</h2>

            <p>{q.description}</p>

            <p>
              <strong>Questions:</strong>{" "}
              {q.numOfQuestions}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {q.category?.title || "No Category"}
            </p>

            <button
              className="login-btn"
              onClick={() => handleDelete(q.quizId)}
            >
              Delete Quiz
            </button>

          </div>

        ))

      )}

    </div>
  );
};

export default Quizzes;