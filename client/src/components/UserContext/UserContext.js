import { createContext, useContext, useState } from "react";

const Context = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("nologin");

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

function useUser() {
  const context = useContext(Context);
  if (context === undefined) {
    console.error("useUser needs to be used with in UserProvider");
  }

  return context;
}

export { useUser, UserProvider };
