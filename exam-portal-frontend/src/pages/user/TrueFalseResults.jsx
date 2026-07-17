import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";

import {
  getUserTrueFalseResults,
} from "../../services/trueFalseService";

const TrueFalseResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
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
      alert("User ID not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response =
        await getUserTrueFalseResults(userId);

      // Show latest attempt first
      setResults(
        [...response.data].reverse()
      );

    } catch (error) {
      console.log(
        "Error loading True/False results:",
        error
      );

      alert(
        "Failed to Load True/False Results"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">

      <h1>📊 My True / False Results</h1>

      <p>
        View your previous True or False examination
        attempts and performance.
      </p>

      <div className="card">

        {loading ? (

          <p>Loading results...</p>

        ) : results.length === 0 ? (

          <div>
            <h2>No Results Available</h2>

            <p>
              You have not attempted any True or False
              examinations yet.
            </p>
          </div>

        ) : (

          <div
            style={{
              overflowX: "auto",
            }}
          >

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >

              <thead>

                <tr>
                  <th>Attempt</th>
                  <th>Total Questions</th>
                  <th>Correct</th>
                  <th>Wrong</th>
                  <th>Marks</th>
                  <th>Percentage</th>
                  <th>Status</th>
                  <th>Submitted At</th>
                </tr>

              </thead>

              <tbody>

                {results.map(
                  (result, index) => {

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
                        key={result.resultId}
                      >

                        <td>
                          {results.length - index}
                        </td>

                        <td>
                          {result.totalQuestions}
                        </td>

                        <td>
                          {result.correctAnswers}
                        </td>

                        <td>
                          {result.wrongAnswers}
                        </td>

                        <td>
                          {result.obtainedMarks}
                          {" / "}
                          {result.totalMarks}
                        </td>

                        <td>
                          {percentage}%
                        </td>

                        <td>
                          <strong>
                            {result.status}
                          </strong>
                        </td>

                        <td>
                          {result.submittedAt}
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

      <br />

      <Link to="/user/true-false-exam">
        <button className="login-btn">
          ✅ Take True / False Exam
        </button>
      </Link>

      {" "}

      <Link to="/user/dashboard">
        <button className="login-btn">
          ← Back to Dashboard
        </button>
      </Link>

    </div>
  );
};

export default TrueFalseResults;