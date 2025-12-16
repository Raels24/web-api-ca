import { useState, createContext } from "react";
import { login, signup } from "../api/auth-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const existingUser = localStorage.getItem("username");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState(existingUser || "");

  //put JWT token and username in local storage
  const setToken = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setAuthToken(token);
    setUserName(username);
  };

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token, username);
      setIsAuthenticated(true);
    }
  };

  //registers user and handles different response formats (true/false or code 201)
  const register = async (username, password) => {
    const result = await signup(username, password);
    return !!(result?.success || result?.code === 201);
  };

  //clears local storage for token and username when signedout
  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAuthToken(null);
    setUserName("");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
        authToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
