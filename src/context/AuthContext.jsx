import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    jwtToken: null,
    userId: null,
    loading: true,
    login: () => {},
    logout: () => {}
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Login function
    function login(token, id) {
        setIsAuthenticated(true);
        setJwtToken(token);
        

        // Save token and id to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);
    }

    // Logout function
    function logout() {
        setIsAuthenticated(false);
        setJwtToken(null);
        setUserId(null);

        // Remove token and id from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    }

    // Restore auth state on page load
    useEffect(() => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("userId");

        if (token && id) {
            setIsAuthenticated(true);
            setJwtToken(token);
            setUserId(id);
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, jwtToken, userId, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use auth
export function useAuth() {
    return useContext(AuthContext);
}
