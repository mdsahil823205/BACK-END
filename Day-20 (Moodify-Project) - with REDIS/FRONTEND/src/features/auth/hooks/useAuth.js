import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth.context";
import { getMe, login, logout, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async ({ email, password, username }) => {
    setLoading(true);
    const data = await register({ email, password, username });
    setUser(data.user);
    setLoading(false);
  };
  const handleLogin = async ({ email, password, username }) => {
    setLoading(true);
    const data = await login({ email, password, username });
    setUser(data.user);
    setLoading(false);
  };
  const handleGetMe = async () => {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);
    setLoading(false);
  };
  const handleLogout = async () => {
    setLoading(true);
    const data = await logout();
    setUser(data.user);
    setLoading(false);
  };

  useEffect(() => {
    handleGetMe();
  }, []);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
};
