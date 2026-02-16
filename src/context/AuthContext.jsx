import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jwtToken, setJwtToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = username === "admin";

  function login(token, username) {
    setIsAuthenticated(true);
    setJwtToken(token);
    setUsername(username);

    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  }

  function logout() {
    setIsAuthenticated(false);
    setJwtToken(null);
    setUsername(null);

    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");

    if (token && savedUsername) {
      setIsAuthenticated(true);
      setJwtToken(token);
      setUsername(savedUsername);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        jwtToken,
        username,
        isAdmin,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
