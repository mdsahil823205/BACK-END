import React, { useState } from "react";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";
import "../styles/register.scss";
import { useAuth } from "../hooks/useAuth";
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate()
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({ email, password, username })
        navigate("/")
    };
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form
                    onSubmit={(e) => {
                        handleRegisterSubmit(e);
                    }}
                >
                    <FormGroup
                        label="Username"
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <FormGroup
                        label="Email"
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <FormGroup
                        label="Password"
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button type="submit">Register</button>
                    <p>
                        Already have an account?<Link to="/login"> Login</Link>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default Register;
