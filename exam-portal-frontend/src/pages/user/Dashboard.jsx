import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import "../../assets/styles/dashboard.css";

const Dashboard = () => {
  return (
    <DashboardLayout role="USER">

      <div className="dashboard-content">

        <h1>Welcome to Your Dashboard 👋</h1>

        <p>
          Manage your examinations, check results,
          track attendance and monitor your performance.
        </p>

        <div className="cards">

          {/* TAKE QUIZ */}

          <div className="card">
            <h2>📝 Take Quiz</h2>

            <p>
              View available quizzes and start your
              examination.
            </p>

            <Link to="/user/quiz">
              <button className="login-btn">
                View Quizzes
              </button>
            </Link>
          </div>


          {/* QUIZ RESULTS */}

          <div className="card">
            <h2>📊 My Quiz Results</h2>

            <p>
              View your previous quiz attempts
              and marks.
            </p>

            <Link to="/user/results">
              <button className="login-btn">
                View Quiz Results
              </button>
            </Link>
          </div>


          {/* CODING EXAM */}

          <div className="card">
            <h2>💻 Coding Exam</h2>

            <p>
              Solve programming problems and submit
              your code for automatic evaluation.
            </p>

            <Link to="/user/coding">
              <button className="login-btn">
                Start Coding Exam
              </button>
            </Link>
          </div>


          {/* CODING RESULTS */}

          <div className="card">
            <h2>💻 My Coding Results</h2>

            <p>
              View your coding examination submissions,
              marks and evaluation status.
            </p>

            <Link to="/user/coding-results">
              <button className="login-btn">
                View Coding Results
              </button>
            </Link>
          </div>


          {/* TRUE FALSE EXAM */}

          <div className="card">
            <h2>✅ True / False Examination</h2>

            <p>
              Take True or False examinations and
              receive your score instantly.
            </p>

            <Link to="/user/true-false-exam">
              <button className="login-btn">
                Start True / False Exam
              </button>
            </Link>
          </div>


          {/* TRUE FALSE RESULTS */}

          <div className="card">
            <h2>📋 My True / False Results</h2>

            <p>
              View your previous True or False
              examination attempts and performance.
            </p>

            <Link to="/user/true-false-results">
              <button className="login-btn">
                View True / False Results
              </button>
            </Link>
          </div>


          {/* GRADES */}

          <div className="card">
            <h2>🎯 Grades & Performance</h2>

            <p>
              View your overall performance across
              quizzes, coding and True/False exams.
            </p>

            <Link to="/user/grades">
              <button className="login-btn">
                View Performance
              </button>
            </Link>
          </div>


          {/* LEADERBOARD */}

          <div className="card">
            <h2>🏆 Leaderboard</h2>

            <p>
              View student rankings based on
              examination performance.
            </p>

            <Link to="/leaderboard">
              <button className="login-btn">
                View Leaderboard
              </button>
            </Link>
          </div>


          {/* ATTENDANCE */}

          <div className="card">
            <h2>📅 Attendance</h2>

            <p>
              Check your attendance records and
              eligibility status.
            </p>

            <Link to="/user/attendance">
              <button className="login-btn">
                View Attendance
              </button>
            </Link>
          </div>


          {/* STUDY RESOURCES */}

          <div className="card">
            <h2>📚 Study Resources</h2>

            <p>
              Access learning materials to prepare
              for exams and improve your skills.
            </p>

            <Link to="/user/resources">
              <button className="login-btn">
                Explore Resources
              </button>
            </Link>
          </div>


          {/* FEEDBACK */}

          <div className="card">
            <h2>💬 My Feedback</h2>

            <p>
              View personalized feedback and
              suggestions from your administrator.
            </p>

            <Link to="/user/feedback">
              <button className="login-btn">
                View Feedback
              </button>
            </Link>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;