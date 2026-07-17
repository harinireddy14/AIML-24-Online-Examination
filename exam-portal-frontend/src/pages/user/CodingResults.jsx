import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";
import DashboardLayout from "../../components/DashboardLayout";
import {
  getUserSubmissions,
} from "../../services/codingService";

const CodingResults = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  // LOAD STUDENT CODING RESULTS
  const loadSubmissions = async () => {
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

      const response =
        await getUserSubmissions(userId);

      // Show latest submission first
      setSubmissions(
        [...response.data].reverse()
      );

    } catch (error) {
      console.log(
        "Error loading coding results:",
        error
      );

      alert(
        "Failed to Load Coding Results"
      );

    } finally {
      setLoading(false);
    }
  };

 return (
  <DashboardLayout role="USER">
    <div className="dashboard-content">

      <h1>💻 My Coding Results</h1>

      <p>
        View your previous coding examination
        submissions, marks and evaluation status.
      </p>

      <div className="card">

        <h2>📊 Coding Exam History</h2>

        {loading ? (

          <p>Loading coding results...</p>

        ) : submissions.length === 0 ? (

          <div>

            <h3>
              No Coding Results Available
            </h3>

            <p>
              You have not submitted any coding
              problems yet.
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
                  <th>Submission ID</th>
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
                        {
                          submission.problemId
                        }
                      </td>

                      <td>
                        {
                          submission.language
                        }
                      </td>

                      <td>
                        {
                          submission.marks
                        } / 100
                      </td>

                      <td>
                        <strong>
                          {
                            submission.status
                          }
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

      {/* VIEW SUBMITTED CODE */}

      {selectedSubmission && (

        <div
          className="card"
          style={{
            marginTop: "30px",
          }}
        >

          <h2>👨‍💻 My Submitted Code</h2>

          <p>
            <strong>
              Submission ID:
            </strong>{" "}
            {
              selectedSubmission.submissionId
            }
          </p>

          <p>
            <strong>
              Problem ID:
            </strong>{" "}
            {
              selectedSubmission.problemId
            }
          </p>

          <p>
            <strong>
              Language:
            </strong>{" "}
            {
              selectedSubmission.language
            }
          </p>

          <p>
            <strong>
              Marks:
            </strong>{" "}
            {
              selectedSubmission.marks
            } / 100
          </p>

          <p>
            <strong>
              Status:
            </strong>{" "}
            {
              selectedSubmission.status
            }
          </p>

          <p>
            <strong>
              Submitted At:
            </strong>{" "}
            {
              selectedSubmission.submittedAt
            }
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
            {
              selectedSubmission.sourceCode
            }
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

      <Link to="/user/coding">

        <button className="login-btn">
          💻 Take Coding Exam
        </button>

      </Link>

      {" "}

      <Link to="/user/dashboard">

        <button className="login-btn">
          ← Back to Dashboard
        </button>

      </Link>

        </div>
  </DashboardLayout>
);
};
export default CodingResults;