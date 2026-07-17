import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";

import API from "../../services/api";

import {
  getUserSubmissions,
} from "../../services/codingService";

import {
  getUserTrueFalseResults,
} from "../../services/trueFalseService";

const Grades = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [codingResults, setCodingResults] = useState([]);
  const [trueFalseResults, setTrueFalseResults] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!storedUser) {
      alert("Please login again");
      setLoading(false);
      return;
    }

    const userId =
      storedUser.userId || storedUser.id;

    if (!userId) {
      alert(
        "User ID not found. Please login again."
      );
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [
        quizResponse,
        codingResponse,
        trueFalseResponse,
      ] = await Promise.all([
        API.get(
          `/api/quizResult/?userId=${userId}`
        ),
        getUserSubmissions(userId),
        getUserTrueFalseResults(userId),
      ]);

      setQuizResults(
        quizResponse.data || []
      );

      setCodingResults(
        codingResponse.data || []
      );

      setTrueFalseResults(
        trueFalseResponse.data || []
      );

    } catch (error) {
      console.log(
        "Error loading grades:",
        error
      );

      alert(
        "Failed to Load Grades"
      );

    } finally {
      setLoading(false);
    }
  };

  const totalAttempts =
    quizResults.length +
    codingResults.length +
    trueFalseResults.length;

  return (
    <div className="grades-page">
  <div className="grades-content">

      <h1>📊 Grades & Performance</h1>

      <p>
        View your overall examination performance
        across quizzes, coding exams and True/False
        examinations.
      </p>

      {loading ? (

        <div className="card">
          <p>Loading your grades...</p>
        </div>

      ) : (

        <>

          {/* PERFORMANCE SUMMARY */}

          <div className="cards">

            <div className="card">

              <h2>🎯 Total Attempts</h2>

              <h1>
                {totalAttempts}
              </h1>

              <p>
                Total examinations attempted
              </p>

            </div>

            <div className="card">

              <h2>📝 Quiz Attempts</h2>

              <h1>
                {quizResults.length}
              </h1>

              <p>
                Quiz examinations completed
              </p>

            </div>

            <div className="card">

              <h2>💻 Coding Attempts</h2>

              <h1>
                {codingResults.length}
              </h1>

              <p>
                Coding problems submitted
              </p>

            </div>

            <div className="card">

              <h2>✅ True / False Attempts</h2>

              <h1>
                {trueFalseResults.length}
              </h1>

              <p>
                True or False exams completed
              </p>

            </div>

          </div>

          <br />

          {/* QUIZ RESULTS */}

          <div className="card">

            <h2>📝 Quiz Performance</h2>

            {quizResults.length === 0 ? (

              <p>
                No Quiz Results Available
              </p>

            ) : (

              <div
                style={{
                  overflowX: "auto",
                }}
              >

                <table
                  style={{
                    width: "100%",
                  }}
                >

                  <thead>

                    <tr>
                      <th>Attempt</th>
                      <th>Quiz</th>
                      <th>Marks</th>
                      <th>Date</th>
                    </tr>

                  </thead>

                  <tbody>

                    {quizResults.map(
                      (result, index) => (

                        <tr
                          key={
                            result.quizResultId ||
                            index
                          }
                        >

                          <td>
                            {index + 1}
                          </td>

                          <td>
                            {result.quiz?.title ||
                              result.quiz?.quizTitle ||
                              "Quiz"}
                          </td>

                          <td>
                            {
                              result.totalObtainedMarks
                            }
                          </td>

                          <td>
                            {
                              result.attemptDatetime
                            }
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          <br />

          {/* CODING RESULTS */}

          <div className="card">

            <h2>💻 Coding Performance</h2>

            {codingResults.length === 0 ? (

              <p>
                No Coding Results Available
              </p>

            ) : (

              <div
                style={{
                  overflowX: "auto",
                }}
              >

                <table
                  style={{
                    width: "100%",
                  }}
                >

                  <thead>

                    <tr>
                      <th>Problem ID</th>
                      <th>Language</th>
                      <th>Marks</th>
                      <th>Status</th>
                      <th>Submitted At</th>
                    </tr>

                  </thead>

                  <tbody>

                    {codingResults.map(
                      (result) => (

                        <tr
                          key={
                            result.submissionId
                          }
                        >

                          <td>
                            {
                              result.problemId
                            }
                          </td>

                          <td>
                            {
                              result.language
                            }
                          </td>

                          <td>
                            {
                              result.marks
                            }
                          </td>

                          <td>
                            <strong>
                              {
                                result.status
                              }
                            </strong>
                          </td>

                          <td>
                            {
                              result.submittedAt
                            }
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          <br />

          {/* TRUE FALSE RESULTS */}

          <div className="card">

            <h2>
              ✅ True / False Performance
            </h2>

            {trueFalseResults.length === 0 ? (

              <p>
                No True/False Results Available
              </p>

            ) : (

              <div
                style={{
                  overflowX: "auto",
                }}
              >

                <table
                  style={{
                    width: "100%",
                  }}
                >

                  <thead>

                    <tr>
                      <th>Correct</th>
                      <th>Wrong</th>
                      <th>Marks</th>
                      <th>Percentage</th>
                      <th>Status</th>
                      <th>Submitted At</th>
                    </tr>

                  </thead>

                  <tbody>

                    {trueFalseResults.map(
                      (result) => {

                        const percentage =
                          result.totalMarks > 0
                            ? (
                                (
                                  result.obtainedMarks /
                                  result.totalMarks
                                ) *
                                100
                              ).toFixed(2)
                            : "0.00";

                        return (

                          <tr
                            key={
                              result.resultId
                            }
                          >

                            <td>
                              {
                                result.correctAnswers
                              }
                            </td>

                            <td>
                              {
                                result.wrongAnswers
                              }
                            </td>

                            <td>
                              {
                                result.obtainedMarks
                              }
                              {" / "}
                              {
                                result.totalMarks
                              }
                            </td>

                            <td>
                              {percentage}%
                            </td>

                            <td>
                              <strong>
                                {
                                  result.status
                                }
                              </strong>
                            </td>

                            <td>
                              {
                                result.submittedAt
                              }
                            </td>

                          </tr>

                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </>

      )}

      <br />

      <Link to="/user/dashboard">

        <button className="login-btn">
          ← Back to Dashboard
        </button>

      </Link>

         </div>
    </div>
  );
};

export default Grades;