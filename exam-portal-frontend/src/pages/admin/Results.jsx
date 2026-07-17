import { useEffect, useState } from "react";
import "../../assets/styles/dashboard.css";
import { getAllResults } from "../../services/quizResultService";

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const response = await getAllResults();
      setResults(response.data);
    } catch (error) {
      console.log("Results Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <h1>🏆 Quiz Results</h1>

      {loading ? (
        <div className="card">
          <p>Loading Results...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="card">
          <h3>No Results Found</h3>
          <p>Student quiz attempts will appear here.</p>
        </div>
      ) : (
        results.map((result) => (
          <div className="card" key={result.quizResId}>
            <h2>{result.quiz?.title || "Quiz"}</h2>

            <p>
              <strong>User ID:</strong> {result.userId}
            </p>

            <p>
              <strong>Marks Obtained:</strong>{" "}
              {result.totalObtainedMarks}
            </p>

            <p>
              <strong>Attempt Date:</strong>{" "}
              {result.attemptDatetime}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {result.quiz?.category?.title || "N/A"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Results;