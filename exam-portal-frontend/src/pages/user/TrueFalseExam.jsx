import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";

import {
  getTrueFalseQuestions,
  submitTrueFalseExam,
} from "../../services/trueFalseService";

const TrueFalseExam = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  // LOAD QUESTIONS
  const loadQuestions = async () => {
    try {
      setLoading(true);

      const response =
        await getTrueFalseQuestions();

      setQuestions(response.data);

    } catch (error) {
      console.log(
        "Error loading True/False questions:",
        error
      );

      alert(
        "Failed to Load True/False Questions"
      );

    } finally {
      setLoading(false);
    }
  };

  // SELECT TRUE OR FALSE
  const handleAnswer = (
    questionId,
    answer
  ) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  // SUBMIT EXAM
  const handleSubmit = async () => {
    if (
      Object.keys(answers).length !==
      questions.length
    ) {
      alert(
        "Please answer all questions before submitting."
      );

      return;
    }

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!storedUser) {
      alert("Please login again");
      return;
    }

    const userId =
      storedUser.userId ||
      storedUser.id;

    if (!userId) {
      alert(
        "User ID not found. Please login again."
      );

      return;
    }

    const confirmSubmit =
      window.confirm(
        "Are you sure you want to submit the exam?"
      );

    if (!confirmSubmit) {
      return;
    }

    try {
      setSubmitting(true);

      const response =
        await submitTrueFalseExam(
          userId,
          answers
        );

      setResult(response.data);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (error) {
      console.log(
        "True/False Submission Error:",
        error
      );

      alert(
        typeof error.response?.data ===
          "string"
          ? error.response.data
          : "Failed to Submit True/False Exam"
      );

    } finally {
      setSubmitting(false);
    }
  };

  // RESULT PAGE
  if (result) {
    return (
      <div className="dashboard-content">

        <h1>
          🏆 True / False Exam Result
        </h1>

        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "40px",
          }}
        >

          <h2>
            {result.status === "PASSED"
              ? "🎉 Congratulations!"
              : "📚 Keep Practicing!"}
          </h2>

          <h2>
            Status: {result.status}
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "50px",
              flexWrap: "wrap",
              marginTop: "35px",
            }}
          >

            <div>
              <h3>
                📝 Total Questions
              </h3>

              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                {result.totalQuestions}
              </p>
            </div>

            <div>
              <h3>
                ✅ Correct
              </h3>

              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                {result.correctAnswers}
              </p>
            </div>

            <div>
              <h3>
                ❌ Wrong
              </h3>

              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                {result.wrongAnswers}
              </p>
            </div>

            <div>
              <h3>
                🎯 Marks
              </h3>

              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                {result.obtainedMarks}
                {" / "}
                {result.totalMarks}
              </p>
            </div>

            <div>
              <h3>
                📊 Percentage
              </h3>

              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                {result.percentage}%
              </p>
            </div>

          </div>

          <div
            style={{
              marginTop: "35px",
            }}
          >

            <Link to="/user/dashboard">

              <button
                className="login-btn"
              >
                ← Back to Dashboard
              </button>

            </Link>

          </div>

        </div>

      </div>
    );
  }

  // EXAM PAGE
  return (
    <div className="dashboard-content">

      <h1>
        ✅ True / False Examination
      </h1>

      <p>
        Read each statement carefully
        and select True or False.
      </p>

      {loading ? (

        <div className="card">
          <p>
            Loading questions...
          </p>
        </div>

      ) : questions.length === 0 ? (

        <div className="card">

          <h2>
            No True / False Questions
            Available
          </h2>

        </div>

      ) : (

        <>

          <div
            className="card"
            style={{
              marginBottom: "25px",
            }}
          >

            <h3>
              📋 Exam Information
            </h3>

            <p>
              <strong>
                Total Questions:
              </strong>{" "}
              {questions.length}
            </p>

            <p>
              <strong>
                Answered:
              </strong>{" "}
              {
                Object.keys(answers)
                  .length
              }
              {" / "}
              {questions.length}
            </p>

          </div>

          {questions.map(
            (question, index) => (

              <div
                className="card"
                key={
                  question.questionId
                }
                style={{
                  marginBottom: "25px",
                }}
              >

                <h3>
                  Question {index + 1}
                </h3>

                <p
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {question.question}
                </p>

                <p>
                  <strong>
                    Marks:
                  </strong>{" "}
                  {question.marks}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "30px",
                    marginTop: "20px",
                    flexWrap: "wrap",
                  }}
                >

                  <label
                    style={{
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >

                    <input
                      type="radio"
                      name={`question-${question.questionId}`}
                      checked={
                        answers[
                          question
                            .questionId
                        ] === true
                      }
                      onChange={() =>
                        handleAnswer(
                          question
                            .questionId,
                          true
                        )
                      }
                    />

                    {" "}True

                  </label>

                  <label
                    style={{
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >

                    <input
                      type="radio"
                      name={`question-${question.questionId}`}
                      checked={
                        answers[
                          question
                            .questionId
                        ] === false
                      }
                      onChange={() =>
                        handleAnswer(
                          question
                            .questionId,
                          false
                        )
                      }
                    />

                    {" "}False

                  </label>

                </div>

              </div>

            )
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "35px",
              marginBottom: "35px",
            }}
          >

            <button
              className="login-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "✅ Submit Exam"}
            </button>

          </div>

        </>

      )}

      <Link to="/user/dashboard">

        <button className="login-btn">
          ← Back to Dashboard
        </button>

      </Link>

    </div>
  );
};

export default TrueFalseExam;