import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";

const Resources = () => {
  const resources = [
    {
      title: "☕ Java Programming",
      description: "Learn Java fundamentals, OOP, collections and exception handling.",
      url: "https://dev.java/learn/",
    },
    {
      title: "⚛️ React JS",
      description: "Learn components, props, state, hooks and modern React development.",
      url: "https://react.dev/learn",
    },
    {
      title: "🌱 Spring Boot",
      description: "Learn how to build Java backend applications and REST APIs.",
      url: "https://spring.io/guides",
    },
    {
      title: "🗄️ MySQL",
      description: "Learn SQL, database management, queries and relational databases.",
      url: "https://dev.mysql.com/doc/",
    },
    {
      title: "🐍 Python",
      description: "Learn Python programming concepts with official tutorials.",
      url: "https://docs.python.org/3/tutorial/",
    },
    {
      title: "🌐 MDN Web Development",
      description: "Learn HTML, CSS and JavaScript for frontend development.",
      url: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
    },
  ];

  return (
    <div className="resources-page">
  <div className="resources-content">

      <h1>📚 Study Resources</h1>

      <p>
        Explore learning materials to improve your knowledge and exam performance.
      </p>

      <div className="cards">

        {resources.map((resource, index) => (

          <div className="card" key={index}>

            <h2>{resource.title}</h2>

            <p>{resource.description}</p>

            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="login-btn">
                Start Learning
              </button>
            </a>

          </div>

        ))}

      </div>

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

export default Resources;