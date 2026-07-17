import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "../../assets/styles/register.css";

const Register = () => {

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phoneNumber: ""
  });

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await registerUser(registerData);

      alert("Registration Successful!");

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert("Registration Failed!");

    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>Create Account 🎓</h1>

        <p>Register to access the Online Examination System</p>

        <form onSubmit={handleRegister}>

          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={registerData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={registerData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={registerData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={registerData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              value={registerData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>

        </form>

        <span className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </span>

      </div>

    </div>
  );
};

export default Register;