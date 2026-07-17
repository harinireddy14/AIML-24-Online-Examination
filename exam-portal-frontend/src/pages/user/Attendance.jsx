import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";
import DashboardLayout from "../../components/DashboardLayout";
import { getUserAttendance } from "../../services/attendanceService";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
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
        await getUserAttendance(userId);

      setAttendance(response.data);

    } catch (error) {
      console.log(
        "Attendance Error:",
        error
      );

      alert(
        "Failed to Load Attendance"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="USER">

      <div className="dashboard-content">

        <h1>📅 My Attendance</h1>

        <p>
          Attendance is automatically marked
          when you complete the daily quiz.
        </p>

        {loading ? (

          <div className="card">
            <p>
              Loading Attendance...
            </p>
          </div>

        ) : attendance.length === 0 ? (

          <div className="card">

            <h3>
              No Attendance Found
            </h3>

            <p>
              Complete today's quiz to mark
              your attendance.
            </p>

          </div>

        ) : (

          <div
            className="card"
            style={{
              overflowX: "auto",
            }}
          >

            <h2>
              📊 Attendance History
            </h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >

              <thead>

                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Activity</th>
                </tr>

              </thead>

              <tbody>

                {attendance.map(
                  (item) => (

                    <tr
                      key={
                        item.attendanceId
                      }
                    >

                      <td>
                        {
                          item.attendanceDate
                        }
                      </td>

                      <td>
                        {item.status ===
                        "PRESENT"
                          ? "✅ PRESENT"
                          : item.status}
                      </td>

                      <td>
                        {item.activity}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

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

export default Attendance;