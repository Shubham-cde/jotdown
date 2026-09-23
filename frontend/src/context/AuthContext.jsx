import { createContext, useEffect, useState } from "react";
import {
  getMe,
  loginUser,
  registerUser,
  saveToken,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    saveToken(data.token);

    const me = await getMe();
    setUser(me);
  };

  const register = async (name, email, password) => {
    const data = await registerUser(name, email, password);
    saveToken(data.token);

    const me = await getMe();
    setUser(me);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const me = await getMe();
        setUser(me);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;