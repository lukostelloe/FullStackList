import { createContext, useContext, useState } from "react";

const Context = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("nologin");

  function dioSomething() {}

  return (
    <Context.Provider value={{ user, setUser, doSomethingElse: dioSomething }}>
      {children}
    </Context.Provider>
  );
};

function useUser() {
  const context = useContext(Context);
  if (context === undefined) {
    console.error("useUSer needs to be used with in SUerProvider");
  }

  return context;
}

export { useUser, UserProvider };
