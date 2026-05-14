import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router";
const Protected = ({ children }) => {
    const { loading, user } = useAuth();
    const navigate = useNavigate();
    if (loading ) {
        return (
            <h1
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                loading.....
            </h1>
        );
    }
    if (!user) {
        return navigate('/login');

    }
    return children;
};

export default Protected;
