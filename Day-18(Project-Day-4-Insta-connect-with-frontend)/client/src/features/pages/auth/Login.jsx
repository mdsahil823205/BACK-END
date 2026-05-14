import React, { useState } from "react";
import axios from "axios";
export const serverUrl = "http://localhost:3000";
import { Link } from "react-router-dom";
import "../auth/form.style.scss"
const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  async function submitHandle(e) {
    e.preventDefault();
    const result = await axios.post(`${serverUrl}/api/auth/login`, {
      username,
      password,
    }, { withCredentials: true });
    setpassword('')
    setusername('')
    console.log(result.data);
  }
  return (
    <main>
      <div className='form-container'>
        <h1>login</h1>
        <form className='form-validate'
          onSubmit={(e) => {
            submitHandle(e);
          }}>

          <input type="text" placeholder='please enter username'
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }} />
          <input
            type="password"
            placeholder='please enter passsword'
            required
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }} />
          <button>submit</button>
          <p>
            dont have an account{" "}
            <Link className="toggleAuthForm" to="/register" >
              register
            </Link>

          </p>
        </form>

      </div>

    </main>
  )
}

export default Login