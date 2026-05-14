import React, { useState } from "react";
import axios from "axios";
export const serverUrl = "http://localhost:3000";
import { Link } from "react-router-dom";
import "../auth/form.style.scss"
const Register = () => {
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    async function submitHandle(e) {
        e.preventDefault();
        const result = await axios.post(
            `${serverUrl}/api/auth/register`,
            {
                username,
                email,
                password,
            },
            { withCredentials: true },
        );
        console.log(result.data);
        setpassword("")
        setusername("")
        setemail("")

    }

    return (
        <main>
            <div className="form-container">
                <h1>register</h1>
                <form
                    className="form-validate"
                    onSubmit={(e) => {
                        submitHandle(e);
                    }}
                >
                    <input
                        type="text"
                        placeholder="please enter username"
                        name="username"
                        required
                        value={username}
                        onChange={(e) => {
                            setusername(e.target.value);
                        }}
                    />
                    <input
                        type="email"
                        placeholder="please enter email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => {
                            setemail(e.target.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="please enter passsword"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => {
                            setpassword(e.target.value);
                        }}
                    />
                    <button>submit</button>
                </form>
                <p>
                    already have an account{" "}
                    <Link className="toggleAuthForm" to="/login">
                        login
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
