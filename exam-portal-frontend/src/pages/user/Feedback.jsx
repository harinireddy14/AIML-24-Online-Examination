import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";
import DashboardLayout from "../../components/DashboardLayout";
import { getUserFeedback } from "../../services/feedbackService";

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (!storedUser) {
        alert("Please login again");
        setLoading(false);
        return;
      }

      const userId =
        storedUser.userId ||
        storedUser.id;

      if (!userId) {
        alert(
          "User ID not found. Please login again."
        );
        setLoading(false);
        return;
      }

      const response =
        await getUserFeedback(userId);

      setFeedbackList(response.data);

    } catch (error) {
      console.log(
        "Feedback Error:",
        error
      );

      alert(
        "Failed to Load Feedback"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="USER">

      <div className="dashboard-content">

        <h1>
          💬 My Performance Feedback
        </h1>

        <p>
          View feedback and suggestions
          provided by your administrator.
        </p>

        {loading ? (

          <div className="card">
            <p>
              Loading Feedback...
            </p>
          </div>

        ) : feedbackList.length === 0 ? (

          <div className="card">

            <h2>
              No Feedback Available
            </h2>

            <p>
              Your administrator has not
              provided any feedback yet.
            </p>

          </div>

        ) : (

          <div className="cards">

            {feedbackList.map(
              (feedback) => (

                <div
                  className="card"
                  key={
                    feedback.feedbackId
                  }
                >

                  <h2>
                    📝 Performance Review
                  </h2>

                  <p>
                    {
                      feedback.feedbackMessage
                    }
                  </p>

                  <p>
                    <strong>
                      Date:
                    </strong>{" "}
                    {
                      feedback.feedbackDate
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

export default Feedback;