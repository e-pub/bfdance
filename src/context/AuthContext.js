import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem("isAdmin") === "true");
  const [isMember, setIsMember] = useState(() => sessionStorage.getItem("isMember") === "true");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("https://your-lambda-api-url/check-auth", {
          withCredentials: true,
        });

        setIsAdmin(response.data.isAdmin);
        setIsMember(response.data.isMember);
        sessionStorage.setItem("isAdmin", response.data.isAdmin);
        sessionStorage.setItem("isMember", response.data.isMember);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAdmin(false);
        setIsMember(false);
        sessionStorage.removeItem("isAdmin");
        sessionStorage.removeItem("isMember");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ isAdmin, isMember, setIsAdmin, setIsMember }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
