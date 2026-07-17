import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";
import { addFeedback } from "../../services/feedbackService";

const Feedback = () => {
  const [userId, setUserId] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !feedbackMessage.trim()) {
      alert("Please enter Student ID and Feedback");
      return;
    }

    try {
      await addFeedback({
        userId: Number(userId),
        feedbackMessage: feedbackMessage,
      });

      alert("Feedback Added Successfully!");

      setUserId("");
      setFeedbackMessage("");
    } catch (error) {
      console.log("Feedback Error:", error);
      alert("Failed to Add Feedback");
    }
  };

  return (
    <div className="dashboard-content">

      <h1>💬 Student Performance Feedback</h1>

      <p>
        Provide personalized feedback and suggestions to help
        students improve their performance.
      </p>

      <div className="card">

        <h2>Give Feedback</h2>

        <form onSubmit={handleSubmit}>

          <label>Student ID</label>

          <br /><br />

          <input
            type="number"
            placeholder="Enter Student ID (Example: 2)"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />

          <br /><br />

          <label>Performance Feedback</label>

          <br /><br />

          <textarea
            placeholder="Enter feedback for the student..."
            value={feedbackMessage}
            onChange={(e) =>
              setFeedbackMessage(e.target.value)
            }
            rows="6"
            required
          />

          <br /><br />

          <button
            type="submit"
            className="login-btn"
          >
            Submit Feedback
          </button>

        </form>

      </div>

      <br />

      <Link to="/admin/dashboard">
        <button className="login-btn">
          Back to Dashboard
        </button>
      </Link>

    </div>
  );
};

export default Feedback;