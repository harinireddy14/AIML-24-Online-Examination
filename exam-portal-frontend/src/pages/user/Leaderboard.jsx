import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";
import { getAllResults } from "../../services/quizResultService";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const response = await getAllResults();

      // Group results by user and calculate total marks
      const studentScores = {};

      response.data.forEach((result) => {
        const userId = result.userId;

        if (!studentScores[userId]) {
          studentScores[userId] = {
            userId: userId,
            totalMarks: 0,
            attempts: 0,
          };
        }

        studentScores[userId].totalMarks +=
          result.totalObtainedMarks;

        studentScores[userId].attempts += 1;
      });

      // Convert object to array and sort highest marks first
      const sortedLeaders = Object.values(studentScores).sort(
        (a, b) => b.totalMarks - a.totalMarks
      );

      setLeaders(sortedLeaders);

    } catch (error) {
      console.log("Leaderboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leaderboard-page">
  <div className="leaderboard-content">

      <h1>🏆 Student Leaderboard</h1>

      <p>
        Rankings based on total marks obtained in quizzes.
      </p>

      {loading ? (

        <div className="card">
          <p>Loading Leaderboard...</p>
        </div>

      ) : leaders.length === 0 ? (

        <div className="card">
          <p>No leaderboard data available.</p>
        </div>

      ) : (

        <div className="card">

          <table>

            <thead>
              <tr>
                <th>Rank</th>
                <th>Student ID</th>
                <th>Quiz Attempts</th>
                <th>Total Marks</th>
              </tr>
            </thead>

            <tbody>

              {leaders.map((student, index) => (

                <tr key={student.userId}>

                  <td>
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}
                  </td>

                  <td>
                    Student {student.userId}
                  </td>

                  <td>
                    {student.attempts}
                  </td>

                  <td>
                    {student.totalMarks}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      <br />

      <Link to="/user/dashboard">
        <button className="login-btn">
          Back to Dashboard
        </button>
      </Link>

    </div>
    </div>
  );
};

export default Leaderboard;