import React, { useState } from "react";
import "./Login.css"; // Подключите файл стилей для формы логина
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";

const Login = () => {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSave = () => {
    if (!email.trim() || !password.trim()) {
      alert("Заполните все поля");
    } else {
      let formData = new FormData();
      formData.append("password", password);
      formData.append("email", email);
      handleLogin(formData, email);
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Login</button>
      <Link to="/register">
        <p>Don't have an account? Sign Up</p>
      </Link>
    </div>
  );
};

export default Login;
