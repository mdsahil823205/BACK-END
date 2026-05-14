import React, { useState } from "react";
import "../styles/login.scss";
import { Link, useNavigate } from "react-router";
import FormGroup from "../components/FormGroup";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password, username })
    navigate("/")
  };
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <FormGroup
            label="Username"
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
          />
          <FormGroup
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <button type="submit">Login</button>
          <p>
            Don't have an account?<Link to="/register"> Register</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
