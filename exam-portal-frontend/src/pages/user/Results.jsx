import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";
import DashboardLayout from "../../components/DashboardLayout";
import { getUserResults } from "../../services/quizResultService";

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (!storedUser) {
        alert(
          "User information not found. Please login again."
        );
        setLoading(false);
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

        setLoading(false);
        return;
      }

      const response =
        await getUserResults(userId);

      setResults(response.data);

    } catch (error) {
      console.log(
        "Results Error:",
        error
      );

      alert(
        "Failed to Load Results"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="USER">

      <div className="dashboard-content">

        <h1>📊 My Quiz Results</h1>

        <p>
          View your previous quiz attempts
          and examination marks.
        </p>

        {loading ? (

          <div className="card">
            <p>
              Loading Results...
            </p>
          </div>

        ) : results.length === 0 ? (

          <div className="card">

            <h3>
              No Results Found
            </h3>

            <p>
              You have not attempted
              any quizzes yet.
            </p>

          </div>

        ) : (

          <div className="cards">

            {results.map(
              (result) => (

                <div
                  className="card"
                  key={result.quizResId}
                >

                  <h2>
                    📝{" "}
                    {result.quiz?.title ||
                      "Quiz"}
                  </h2>

                  <p>
                    <strong>
                      Marks Obtained:
                    </strong>{" "}
                    {
                      result.totalObtainedMarks
                    }
                  </p>

                  <p>
                    <strong>
                      Category:
                    </strong>{" "}
                    {result.quiz
                      ?.category
                      ?.title ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>
                      Attempt Date:
                    </strong>{" "}
                    {
                      result.attemptDatetime
                    }
                  </p>

                </div>

              )
            )}

          </div>

        )}

        <br />

        <Link to="/user/dashboard">

          <button className="login-btn">
            ← Back to Dashboard
          </button>

        </Link>

      </div>

    </DashboardLayout>
  );
};

export default Results;