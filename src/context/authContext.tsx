"use client";

import { Auth } from "@/api/generated/thinkEasy.schemas";
import { useLocalStorage } from "@/components/LocalStorageProvider";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  saveToken: (data: Auth) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getItem, setItem, removeItem } = useLocalStorage();

  const [token, setToken] = useState<string | null>(() => {
    // Load token from localStorage
    return getItem("auth_token") || null;
  });

  const saveToken = (data: Auth) => {
    setToken(data.accessToken);
    setItem("auth_token", data.accessToken);
    // For future refresh token call implementation
    setItem("refresh_token", data.refreshToken);
  };

  const logout = () => {
    setToken(null);
    removeItem("auth_token"); // Remove token on logout
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
