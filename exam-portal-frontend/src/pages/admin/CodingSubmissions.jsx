import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";

import {
  getAllSubmissions,
} from "../../services/codingService";

const CodingSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  // LOAD ALL STUDENT SUBMISSIONS
  const loadSubmissions = async () => {
    try {
      setLoading(true);

      const response = await getAllSubmissions();

      setSubmissions(response.data);

    } catch (error) {
      console.log(
        "Error loading coding submissions:",
        error
      );

      alert(
        "Failed to Load Coding Submissions"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">

      <h1>💻 Coding Submissions</h1>

      <p>
        View student coding exam submissions,
        evaluation status and marks.
      </p>

      <div className="card">

        <h2>📊 Student Submissions</h2>

        {loading ? (

          <p>Loading submissions...</p>

        ) : submissions.length === 0 ? (

          <p>No Coding Submissions Available</p>

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
                  <th>Submission ID</th>
                  <th>User ID</th>
                  <th>Problem ID</th>
                  <th>Language</th>
                  <th>Marks</th>
                  <th>Status</th>
                  <th>Submitted At</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {submissions.map(
                  (submission) => (

                    <tr
                      key={
                        submission.submissionId
                      }
                    >

                      <td>
                        {
                          submission.submissionId
                        }
                      </td>

                      <td>
                        {submission.userId}
                      </td>

                      <td>
                        {submission.problemId}
                      </td>

                      <td>
                        {submission.language}
                      </td>

                      <td>
                        {submission.marks}
                      </td>

                      <td>
                        <strong>
                          {submission.status}
                        </strong>
                      </td>

                      <td>
                        {
                          submission.submittedAt
                        }
                      </td>

                      <td>

                        <button
                          className="login-btn"
                          onClick={() =>
                            setSelectedSubmission(
                              submission
                            )
                          }
                        >
                          👁 View Code
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* VIEW STUDENT SOURCE CODE */}

      {selectedSubmission && (

        <div
          className="card"
          style={{
            marginTop: "30px",
          }}
        >

          <h2>
            👨‍💻 Submitted Code
          </h2>

          <p>
            <strong>
              Submission ID:
            </strong>{" "}
            {
              selectedSubmission.submissionId
            }
          </p>

          <p>
            <strong>User ID:</strong>{" "}
            {selectedSubmission.userId}
          </p>

          <p>
            <strong>Problem ID:</strong>{" "}
            {selectedSubmission.problemId}
          </p>

          <p>
            <strong>Language:</strong>{" "}
            {selectedSubmission.language}
          </p>

          <p>
            <strong>Marks:</strong>{" "}
            {selectedSubmission.marks} / 100
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {selectedSubmission.status}
          </p>

          <h3>Source Code</h3>

          <pre
            style={{
              padding: "20px",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              fontFamily:
                "Consolas, monospace",
              borderRadius: "8px",
            }}
          >
            {selectedSubmission.sourceCode}
          </pre>

          <button
            className="login-btn"
            onClick={() =>
              setSelectedSubmission(null)
            }
          >
            Close Code
          </button>

        </div>

      )}

      <br />

      <Link to="/admin/dashboard">

        <button className="login-btn">
          ← Back to Dashboard
        </button>

      </Link>

    </div>
  );
};

export default CodingSubmissions;