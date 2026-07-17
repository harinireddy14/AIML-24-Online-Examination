import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../assets/styles/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-left">

          <h1>Online Examination System</h1>

          <p>
            A modern platform for conducting secure online examinations,
            managing quizzes, evaluating results, and tracking student
            performance with ease.
          </p>

          <div className="hero-buttons">

            <Link to="/login">
              <button className="btn-primary">
                Start Exam
              </button>
            </Link>

            <Link to="/register">
              <button className="btn-secondary">
                Learn More
              </button>
            </Link>

          </div>

        </div>

        <div className="hero-right">

          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900"
            alt="Online Examination"
          />

        </div>

      </section>

      {/* Statistics */}

      <section className="stats">

        <div className="stat-card">
          <h2>1000+</h2>
          <p>Students</p>
        </div>

        <div className="stat-card">
          <h2>250+</h2>
          <p>Examinations</p>
        </div>

        <div className="stat-card">
          <h2>99%</h2>
          <p>Success Rate</p>
        </div>

      </section>

      {/* Features */}

      <section className="features">

        <h2>Why Choose Our Platform?</h2>

        <div className="feature-container">

          <div className="feature-card">

            <h3>📝 Online Exams</h3>

            <p>
              Conduct secure online examinations with automatic evaluation.
            </p>

          </div>

          <div className="feature-card">

            <h3>👨‍🎓 Student Management</h3>

            <p>
              Manage students, quizzes, attendance and academic records.
            </p>

          </div>

          <div className="feature-card">

            <h3>📊 Performance Reports</h3>

            <p>
              View instant results with detailed analytics and reports.
            </p>

          </div>

        </div>

      </section>

      {/* Workflow */}

      <section className="workflow">

        <h2>How It Works</h2>

        <div className="workflow-container">

          <div className="workflow-card">
            <h3>1</h3>
            <h4>Register</h4>
            <p>Create your student account.</p>
          </div>

          <div className="workflow-card">
            <h3>2</h3>
            <h4>Login</h4>
            <p>Login securely using your credentials.</p>
          </div>

          <div className="workflow-card">
            <h3>3</h3>
            <h4>Attend Exam</h4>
            <p>Complete quizzes and coding examinations.</p>
          </div>

          <div className="workflow-card">
            <h3>4</h3>
            <h4>Get Results</h4>
            <p>View instant scores and performance reports.</p>
          </div>

        </div>

      </section>

      <Footer />

    </>
  );
};

export default Home;