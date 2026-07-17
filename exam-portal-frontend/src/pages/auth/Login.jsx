import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "../../assets/styles/login.css";

const Login = () => {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await loginUser(loginData);

      console.log("Login Response:", response.data);

      localStorage.setItem("token", response.data.jwtToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login Successful!");

      // Check user role
      if (
        response.data.user.roles &&
        response.data.user.roles.some(
          (role) => role.roleName === "ADMIN"
        )
      ) {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (error) {

      console.log(error);

      alert("Invalid Username or Password");

    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back 👋</h1>

        <p>Login to continue to the Online Examination System</p>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>Username</label>

            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />

          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <span className="register-link">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </span>

      </div>

    </div>
  );
};

export default Login;