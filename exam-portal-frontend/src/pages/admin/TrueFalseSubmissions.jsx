import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";

import {
  getAllTrueFalseResults,
} from "../../services/trueFalseService";

const TrueFalseSubmissions = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  // LOAD ALL TRUE/FALSE RESULTS
  const loadResults = async () => {
    try {
      setLoading(true);

      const response =
        await getAllTrueFalseResults();

      setResults(response.data);

    } catch (error) {
      console.log(
        "Error loading True/False submissions:",
        error
      );

      alert(
        "Failed to Load True/False Submissions"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">

      <h1>✅ True / False Submissions</h1>

      <p>
        View student True or False examination
        attempts, marks and performance.
      </p>

      <div className="card">

        <h2>📊 Student Submissions</h2>

        {loading ? (

          <p>Loading submissions...</p>

        ) : results.length === 0 ? (

          <p>
            No True/False Submissions Available
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
                borderCollapse: "collapse",
              }}
            >

              <thead>

                <tr>
                  <th>Result ID</th>
                  <th>User ID</th>
                  <th>Total Questions</th>
                  <th>Correct</th>
                  <th>Wrong</th>
                  <th>Marks</th>
                  <th>Status</th>
                  <th>Submitted At</th>
                </tr>

              </thead>

              <tbody>

                {results.map((result) => (

                  <tr key={result.resultId}>

                    <td>
                      {result.resultId}
                    </td>

                    <td>
                      {result.userId}
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
                      <strong>
                        {result.status}
                      </strong>
                    </td>

                    <td>
                      {result.submittedAt}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

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

export default TrueFalseSubmissions;