import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(); // Create a context object

// Define a hook for easy use of the context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Define any actions you need, like login or logout
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    // The value provided to the context consumers
    const value = { isAuthenticated, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
