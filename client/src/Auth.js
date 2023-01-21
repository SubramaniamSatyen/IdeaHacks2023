import { createContext, useContext } from "react";
import { useState } from "react";

const AuthContext = createContext("_no_user");

//Initalize state to hold authentication
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("_no_user");
  
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  };