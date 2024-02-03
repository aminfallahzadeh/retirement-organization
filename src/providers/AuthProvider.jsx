// react imports
import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const CapthaHandler = (value) => {
    setIsCaptchaValid(value);
  };

  const contextValue = {
    isCaptchaValid,
    CapthaHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
