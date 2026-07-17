import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import "../assets/styles/header.css";

const Header = () => {
  return (
    <header className="header">

      <Link to="/" className="logo">

        <FaGraduationCap className="logo-icon" />

        <span>Online Examination System</span>

      </Link>

      <nav className="navbar">

        <Link to="/">Home</Link>

        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>

        <Link to="/admin/dashboard">

          <button className="header-btn">
            Admin Portal
          </button>

        </Link>

      </nav>

    </header>
  );
};

export default Header;