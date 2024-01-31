// react imports
import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const setCaptchaValid = (value) => {
    setIsCaptchaValid(value);
  };

  return (
    <AuthContext.Provider value={{ isCaptchaValid, setCaptchaValid }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
