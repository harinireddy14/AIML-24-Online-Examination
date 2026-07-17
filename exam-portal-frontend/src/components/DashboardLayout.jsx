import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/dashboardLayout.css";

const DashboardLayout = ({ children, role = "USER" }) => {
  const navigate = useNavigate();

  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  const firstName = user.firstName || "";
  const lastName = user.lastName || "";

  const fullName =
    `${firstName} ${lastName}`.trim() ||
    user.username ||
    (role === "ADMIN" ? "Administrator" : "Student");

  const isAdmin =
    role === "ADMIN" || user.role === "ADMIN";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="portal-layout">

      {/* LEFT SIDEBAR */}

      <aside className="portal-sidebar">

        <div className="portal-logo">

          <div className="portal-logo-icon">
            🎓
          </div>

          <div>
            <h2>ExamPortal</h2>
            <span>Online Examination</span>
          </div>

        </div>

        <nav className="portal-menu">

          <Link
            to={
              isAdmin
                ? "/admin/dashboard"
                : "/user/dashboard"
            }
            className="portal-menu-item"
          >
            🏠 Dashboard
          </Link>

          {isAdmin ? (
            <>

              <Link
                to="/admin/quizzes"
                className="portal-menu-item"
              >
                📝 Manage Quizzes
              </Link>

              <Link
                to="/admin/coding"
                className="portal-menu-item"
              >
                💻 Coding Problems
              </Link>

              <Link
                to="/admin/coding-submissions"
                className="portal-menu-item"
              >
                📊 Coding Submissions
              </Link>

              <Link
                to="/admin/true-false"
                className="portal-menu-item"
              >
                ✅ True / False
              </Link>

              <Link
                to="/admin/true-false-submissions"
                className="portal-menu-item"
              >
                📋 True/False Results
              </Link>

            </>
          ) : (
            <>

              <Link
                to="/user/quiz"
                className="portal-menu-item"
              >
                📝 Take Quiz
              </Link>

              <Link
                to="/user/coding"
                className="portal-menu-item"
              >
                💻 Coding Exam
              </Link>

              <Link
                to="/user/true-false-exam"
                className="portal-menu-item"
              >
                ✅ True / False
              </Link>

              <Link
                to="/user/grades"
                className="portal-menu-item"
              >
                📊 Grades
              </Link>

              <Link
                to="/user/attendance"
                className="portal-menu-item"
              >
                📅 Attendance
              </Link>

              <Link
                to="/user/resources"
                className="portal-menu-item"
              >
                📚 Resources
              </Link>

              <Link
                to="/user/feedback"
                className="portal-menu-item"
              >
                💬 Feedback
              </Link>

            </>
          )}

        </nav>

        <button
          className="portal-logout"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </aside>

      {/* RIGHT SIDE */}

      <div className="portal-main">

        {/* TOP HEADER */}

        <header className="portal-header">

          <div className="portal-header-title">

            <span className="portal-header-small">
              ONLINE EXAMINATION SYSTEM
            </span>

            <h1>
              {isAdmin
                ? "Admin Dashboard"
                : "Student Dashboard"}
            </h1>

          </div>

          {/* PROFILE */}

          <div className="portal-profile">

            <Link
  to="/profile"
  className="portal-profile"
  style={{
    textDecoration: "none",
    color: "white",
    cursor: "pointer",
  }}
>
  <div className="portal-profile-image">
    {firstName
      ? firstName.charAt(0).toUpperCase()
      : "👤"}
  </div>

  <div className="portal-profile-info">
    <strong>
      {fullName}
    </strong>

    <span>
      {isAdmin
        ? "Administrator"
        : "Student"}
    </span>
  </div>
</Link>

            

          </div>

        </header>

        {/* PAGE CONTENT */}

        <main className="portal-content">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;