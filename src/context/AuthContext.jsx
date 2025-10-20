import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Tambahkan loading

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        console.error("Invalid token");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    }
    setLoading(false); // selesai cek
  }, []);

  const login = (access, refresh) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    setUser(jwtDecode(access));
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
