import { useEffect, useState } from "react";
import "../../assets/styles/dashboard.css";
import DashboardLayout from "../../components/DashboardLayout";
import { getQuizzes } from "../../services/quizService";
import { getQuestionsByQuiz } from "../../services/questionService";
import { submitQuiz } from "../../services/quizResultService";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const response = await getQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to Load Quizzes");
    }
  };

  const startQuiz = async (quiz) => {
    try {
      setSelectedQuiz(quiz);

      const response = await getQuestionsByQuiz(
        quiz.quizId
      );

      setQuestions(response.data);
      setAnswers({});
    } catch (error) {
      console.log(error);
      alert("Failed to Load Questions");
    }
  };

  const handleAnswer = (
    questionId,
    answer
  ) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    try {
      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (!storedUser) {
        alert(
          "User information not found. Please login again."
        );
        return;
      }

      const userId =
        storedUser.userId ||
        storedUser.id;

      if (!userId) {
        console.log(
          "Stored User:",
          storedUser
        );

        alert(
          "User ID not found. Please login again."
        );
        return;
      }

      if (
        Object.keys(answers).length === 0
      ) {
        alert(
          "Please answer at least one question"
        );
        return;
      }

      const response = await submitQuiz(
        userId,
        selectedQuiz.quizId,
        answers
      );

      alert(
        "Quiz Submitted Successfully! Marks: " +
          response.data.totalObtainedMarks
      );

      setSelectedQuiz(null);
      setQuestions([]);
      setAnswers({});

    } catch (error) {
      console.log(error);

      alert(
        "Failed to Submit Quiz"
      );
    }
  };

  // ==========================================
  // ACTUAL QUIZ EXAM
  // NO DASHBOARD LAYOUT HERE
  // ==========================================

  if (selectedQuiz) {
    return (
      <div className="dashboard-content">

        <h1>
          📝 {selectedQuiz.title}
        </h1>

        <p>
          {selectedQuiz.description}
        </p>

        {questions.length === 0 ? (

          <div className="card">

            <p>
              No Questions Available for
              this Quiz
            </p>

          </div>

        ) : (

          <>

            {questions.map(
              (q, index) => (

                <div
                  className="card"
                  key={q.quesId}
                >

                  <h3>
                    {index + 1}.{" "}
                    {q.content}
                  </h3>

                  {[
                    q.option1,
                    q.option2,
                    q.option3,
                    q.option4,
                  ].map(
                    (
                      option,
                      optionIndex
                    ) => (

                      <div
                        key={
                          optionIndex
                        }
                      >

                        <label>

                          <input
                            type="radio"
                            name={`question-${q.quesId}`}
                            value={option}
                            checked={
                              answers[
                                q.quesId
                              ] === option
                            }
                            onChange={() =>
                              handleAnswer(
                                q.quesId,
                                option
                              )
                            }
                          />

                          {" "}
                          {option}

                        </label>

                        <br />
                        <br />

                      </div>

                    )
                  )}

                </div>

              )
            )}

            <button
              className="login-btn"
              onClick={handleSubmit}
            >
              Submit Quiz
            </button>

          </>

        )}

        <br />
        <br />

        <button
          className="login-btn"
          onClick={() => {
            setSelectedQuiz(null);
            setQuestions([]);
            setAnswers({});
          }}
        >
          ← Back to Quizzes
        </button>

      </div>
    );
  }

  // ==========================================
  // AVAILABLE QUIZZES
  // DASHBOARD LAYOUT IS SHOWN HERE
  // ==========================================

  return (
    <DashboardLayout role="USER">

      <div className="dashboard-content">

        <h1>
          📝 Available Quizzes
        </h1>

        <p>
          Select an available quiz and
          start your examination.
        </p>

        {quizzes.length === 0 ? (

          <div className="card">

            <p>
              No Quizzes Available
            </p>

          </div>

        ) : (

          <div className="cards">

            {quizzes.map(
              (quiz) => (

                <div
                  className="card"
                  key={quiz.quizId}
                >

                  <h2>
                    {quiz.title}
                  </h2>

                  <p>
                    {quiz.description}
                  </p>

                  <p>
                    <strong>
                      Questions:
                    </strong>{" "}
                    {
                      quiz.numOfQuestions
                    }
                  </p>

                  <p>
                    <strong>
                      Category:
                    </strong>{" "}
                    {quiz.category
                      ?.title ||
                      "N/A"}
                  </p>

                  <button
                    className="login-btn"
                    onClick={() =>
                      startQuiz(quiz)
                    }
                  >
                    Start Quiz
                  </button>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
};

export default Quiz;