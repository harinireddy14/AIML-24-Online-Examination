import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import "../../assets/styles/dashboard.css";

const Dashboard = () => {
  return (
    <DashboardLayout role="ADMIN">

      <div className="dashboard-content">

        <h1>Welcome to Admin Dashboard 👋</h1>

        <p>
          Manage examinations, questions, coding problems,
          student submissions, results and feedback.
        </p>

        <div className="cards">

          {/* CATEGORIES */}

          <div className="card">
            <h2>📚 Categories</h2>

            <p>
              Create and manage examination categories.
            </p>

            <Link to="/admin/categories">
              <button className="login-btn">
                Manage Categories
              </button>
            </Link>
          </div>


          {/* QUIZZES */}

          <div className="card">
            <h2>📝 Quizzes</h2>

            <p>
              Create and manage online MCQ quizzes
              and examinations.
            </p>

            <Link to="/admin/quizzes">
              <button className="login-btn">
                Manage Quizzes
              </button>
            </Link>
          </div>


          {/* QUESTIONS */}

          <div className="card">
            <h2>❓ Quiz Questions</h2>

            <p>
              Add and manage questions for your
              online quizzes.
            </p>

            <Link to="/admin/questions">
              <button className="login-btn">
                Manage Questions
              </button>
            </Link>
          </div>


          {/* QUIZ RESULTS */}

          <div className="card">
            <h2>🏆 Quiz Results</h2>

            <p>
              View student quiz attempts, marks
              and examination results.
            </p>

            <Link to="/admin/results">
              <button className="login-btn">
                View Quiz Results
              </button>
            </Link>
          </div>


          {/* CODING EXAMS */}

          <div className="card">
            <h2>💻 Coding Exams</h2>

            <p>
              Create programming problems and
              manage automatic evaluation test cases.
            </p>

            <Link to="/admin/coding">
              <button className="login-btn">
                Manage Coding Problems
              </button>
            </Link>
          </div>


          {/* CODING SUBMISSIONS */}

          <div className="card">
            <h2>📊 Coding Submissions</h2>

            <p>
              View student source code, programming
              language, marks and evaluation status.
            </p>

            <Link to="/admin/coding-submissions">
              <button className="login-btn">
                View Coding Submissions
              </button>
            </Link>
          </div>


          {/* TRUE FALSE QUESTIONS */}

          <div className="card">
            <h2>✅ True / False Questions</h2>

            <p>
              Create, edit and manage True or False
              examination questions.
            </p>

            <Link to="/admin/true-false">
              <button className="login-btn">
                Manage True / False
              </button>
            </Link>
          </div>


          {/* TRUE FALSE SUBMISSIONS */}

          <div className="card">
            <h2>📋 True / False Submissions</h2>

            <p>
              View student True or False attempts,
              marks, results and performance.
            </p>

            <Link to="/admin/true-false-submissions">
              <button className="login-btn">
                View Submissions
              </button>
            </Link>
          </div>


          {/* PERFORMANCE FEEDBACK */}

          <div className="card">
            <h2>💬 Performance Feedback</h2>

            <p>
              Give personalized feedback and suggestions
              to students based on their performance.
            </p>

            <Link to="/admin/feedback">
              <button className="login-btn">
                Give Feedback
              </button>
            </Link>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;