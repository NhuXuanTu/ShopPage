import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("shop_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("shop_users") || "[]");

    const existed = users.find((item) => item.email === email);
    if (existed) {
      throw new Error("Email đã tồn tại.");
    }

    const newUser = { id: Date.now(), name, email, password };
    const nextUsers = [...users, newUser];
    localStorage.setItem("shop_users", JSON.stringify(nextUsers));

    const loggedInUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    localStorage.setItem("shop_user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("shop_users") || "[]");
    const foundUser = users.find(
      (item) => item.email === email && item.password === password,
    );

    if (!foundUser) {
      throw new Error("Sai email hoặc mật khẩu.");
    }

    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    localStorage.setItem("shop_user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem("shop_user");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      register,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
